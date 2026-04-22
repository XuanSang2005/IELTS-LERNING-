# Tổng hợp lỗi — Security Audit Module Payments

**Ngày:** 2026-04-22
**Trạng thái:** Dev-local, chưa nhận tiền thật
**Rủi ro tổng thể:** 🔴 **CAO** — không được deploy production cho đến khi fix xong toàn bộ Critical + High

---

## Bảng tổng hợp

| Mức độ | Số lượng | Trạng thái |
|---|---|---|
| 🔴 Critical | 3 | Phải fix trước khi nhận tiền thật |
| 🟡 High | 4 | Phải fix trước launch |
| 🟢 Medium | 9 | Nên fix trước launch (5 thực sự cần fix, 4 đã PASS) |
| ℹ️ Low | 4 | Quan sát / đã PASS |

**Tổng thời gian fix ước tính:** ~8 tiếng (4h Critical+High, 4h Medium)

---

## 🔴 CRITICAL — 3 lỗi

### CRITICAL-1: Webhook tin tưởng body do client gửi (không verify integrity)
| Mục | Nội dung |
|---|---|
| **File** | `backend/src/payments/payments.controller.ts:87-128`, `payments.service.ts:122-191` |
| **Vấn đề** | Chỉ check Apikey header. Body (`amount`, `tid`, `description`, `when`) hoàn toàn do client control. Ai có secret là giả được webhook. |
| **Hậu quả** | Attacker forge webhook → upgrade bất kỳ user nào thành Pro mà không chuyển tiền |
| **Exploit** | Lấy secret → tạo reference `MRDABC123` → POST webhook giả với `amount: 199000, description: "MRDABC123"` → Pro miễn phí |
| **Fix** | Gọi ngược Casso REST API (`GET /v2/transactions?tid=xxx`) để verify tid có thật → webhook chỉ là trigger |
| **Effort** | Medium (2-3h) |

### CRITICAL-2: Replay protection dùng timestamp trong body (attacker-controlled)
| Mục | Nội dung |
|---|---|
| **File** | `backend/src/payments/payments.controller.ts:108-123` |
| **Vấn đề** | Check `tx.when` có trong 5 phút, nhưng `tx.when` nằm trong body → attacker tự set thành `now` |
| **Hậu quả** | "Replay protection" chỉ chống replay vô tình, không chống attacker chủ đích |
| **Exploit** | Capture webhook cũ → đổi `when` thành now → gửi lại → qua check |
| **Fix** | Dựa vào fix CRITICAL-1 (Casso REST verify) làm lớp thật. Thêm comment đánh dấu `tx.when` untrusted |
| **Effort** | Small (10 phút comments) |

### CRITICAL-3: `.env.example` có account number trông như thật
| Mục | Nội dung |
|---|---|
| **File** | `backend/.env.example:37-41` |
| **Vấn đề** | `MERIDIAN_BANK_ACCOUNT_NO=0123456789` + `NGUYEN VAN A` — plausible. Copy nhầm `.env.example` → `.env` là tiền vào tay người lạ |
| **Hậu quả** | Mất tiền thật cho bên thứ ba vô tội + damage thương hiệu |
| **Exploit** | Không cần exploit — chỉ cần 1 lỗi ops |
| **Fix** | 1) Đổi sang `REPLACE-WITH-REAL-ACCOUNT-NO`. 2) Thêm guard trong `bankInfo()` throw nếu thấy giá trị demo. 3) Sanity check khi `NODE_ENV=production` |
| **Effort** | Small (20 phút) |

---

## 🟡 HIGH — 4 lỗi

### HIGH-1: Không rate limit `/webhook/casso`
| Mục | Nội dung |
|---|---|
| **File** | `backend/src/payments/payments.controller.ts:78` |
| **Vấn đề** | Webhook public, không throttle. Attacker spam được |
| **Hậu quả** | DoS, log flooding, khuếch đại brute-force reference |
| **Fix** | `@nestjs/throttler` — 60 req/phút/IP |
| **Effort** | Small (30 phút) |

### HIGH-2: Payment id + reference quá ngắn, enumerable
| Mục | Nội dung |
|---|---|
| **File** | `backend/src/payments/payments.controller.ts:47-51`, `payments.service.ts:195-204` |
| **Vấn đề** | Mongo ObjectId lộ timestamp + volume. Reference `MRDxxxxxx` chỉ 6 ký tự (2.2 tỷ tổ hợp — brute-force được) |
| **Hậu quả** | Competitor biết volume giao dịch. Kết hợp CRITICAL-1, attacker brute-force reference của user khác rồi upgrade họ |
| **Fix** | 1) Token public 128-bit (nanoid 21 ký tự) thay cho `_id`. 2) Reference dài 10+ ký tự (3.6 × 10^15 tổ hợp) |
| **Effort** | Medium (2h) |

### HIGH-3: Tolerance amount ±1000 VND không cần thiết
| Mục | Nội dung |
|---|---|
| **File** | `backend/src/payments/payments.service.ts:151` |
| **Vấn đề** | VND không có đơn vị phụ, bank không làm tròn. Tolerance tạo kẽ hở nếu 2 gói có giá gần nhau + amplify CRITICAL-1 |
| **Hậu quả** | Attacker có thể trả ít hơn amount mà vẫn được Pro |
| **Fix** | Đổi sang exact match: `amountVnd: tx.amount` |
| **Effort** | Tiny (1 dòng) |

### HIGH-4: Không rate limit `POST /payments`
| Mục | Nội dung |
|---|---|
| **File** | `backend/src/payments/payments.controller.ts:30-37` |
| **Vấn đề** | User/tài khoản bị hack spam được. Row `pending` hết hạn không bị dọn (`expireIfNeeded` chỉ chạy khi đọc) |
| **Hậu quả** | Fill Mongo collection, index phình, cost tăng |
| **Fix** | 1) `@Throttle({ limit: 10, ttl: 3600000 })` — 10 session/giờ/user. 2) Mongo TTL index trên `expiresAt` cho row `pending` |
| **Effort** | Small (1h) |

---

## 🟢 MEDIUM — 5 cần fix, 4 đã PASS

### Cần fix:

| # | Vấn đề | File | Fix | Effort |
|---|---|---|---|---|
| M-3 | Không IP allowlist cho Casso | `payments.controller.ts:78` | Env `CASSO_WEBHOOK_IP_ALLOWLIST` + guard check `req.ip` | Small (1h) |
| M-4 | Batch transaction không giới hạn | `payments.service.ts:129-188` | Cap 50 tx/webhook hoặc enqueue async | Small (15 phút) |
| M-6 | CORS `*` trong production vẫn pass | `backend/src/main.ts:11-19` | Reject `*` khi `NODE_ENV=production` | Tiny (10 phút) |
| M-7 | QR ảnh serve qua third-party `img.vietqr.io` | `payments.service.ts:177-188` | Proxy qua `/payments/:id/qr` | Medium (2h) |
| M-8 | Không có correlation id FE ↔ BE ↔ Casso | Toàn bộ flow | Log `reference` ở mọi handler | Tiny (30 phút) |

### Đã PASS (ghi chú để không regression):

| # | Mục | Trạng thái |
|---|---|---|
| M-1 | Apikey có bị log không? | ✅ Không log |
| M-2 | Polling có dừng khi tab ẩn? | ✅ `refetchIntervalInBackground: false` |
| M-5 | CSRF? | ✅ JWT in header, non-issue |
| M-9 | Status endpoint có leak bank info? | ✅ Chỉ detail endpoint trả bank, đúng design |

---

## ℹ️ LOW / Observational — tất cả PASS

| # | Mục | Trạng thái |
|---|---|---|
| L-1 | Polling dừng khi status terminal | ✅ `refetchInterval: false` khi paid/failed/expired |
| L-2 | XSS trong BankDetails copy button | ✅ React auto-escape + clipboard.writeText string |
| L-3 | Open redirect qua `?redirect=` | ✅ Validate `startsWith('/')` |
| L-4 | `/pricing` public không auth | ✅ Đúng design |

---

## State machine — phát hiện bug

| Transition | Reachable? | Ghi chú |
|---|---|---|
| `pending → paid` | ✅ | Atomic flip trong webhook |
| `pending → expired` | ✅ | Lazy check trên mỗi read |
| `pending → failed` | ❌ | **Không có code nào set `failed`** |
| `paid → *` | ✅ blocked | Filter `status: 'pending'` chặn |
| `expired → paid` | ✅ blocked | Cùng filter |

**🐛 Bug: `failed` là dead state** — khai báo enum, UI render, nhưng backend không bao giờ set. Phải hoặc implement (admin chargeback) hoặc xóa khỏi enum.

---

## Idempotency — tất cả PASS

| Check | Trạng thái |
|---|---|
| Unique sparse index trên `cassoTxId` | ✅ |
| Pre-check trước khi process | ✅ `model.exists({ cassoTxId })` |
| Atomic update trên pending row | ✅ `findOneAndUpdate` |
| Duplicate-key race handled | ✅ `isDuplicateKeyError` catch |
| `paid → pending` backslide | ✅ Blocked bằng filter |
| Unique index trên `reference` | ✅ |

Đây là phần làm đúng nhất của module. Không được phá khi fix các lỗi khác.

---

## 16 điểm đã làm đúng (KHÔNG regression)

1. ✅ `crypto.timingSafeEqual` cho Apikey compare
2. ✅ Length-gate trước timing-safe compare
3. ✅ Unique sparse index `cassoTxId` + unique `reference`
4. ✅ Atomic `findOneAndUpdate` cho status flip
5. ✅ IDOR check: `doc.userId.toString() !== userId` trả NotFound (không leak existence)
6. ✅ `Types.ObjectId.isValid(id)` trước query
7. ✅ Webhook reject sớm khi `body.error !== 0`
8. ✅ Zod validate mọi request body
9. ✅ Pricing từ env, không hardcode
10. ✅ Bank info từ env, không hardcode
11. ✅ `refetchIntervalInBackground: false`
12. ✅ Redirect guard `startsWith('/')` — chặn open redirect
13. ✅ Apikey không log khi reject
14. ✅ `tx.amount <= 0` filter ra (refund/outgoing)
15. ✅ `mintReference` dùng `crypto.randomBytes` (CSPRNG)
16. ✅ CSRF non-issue — JWT trong Authorization header

---

## Thứ tự fix đề xuất

### Bắt buộc trước production (~4 tiếng)

| Thứ tự | Lỗi | Effort |
|---|---|---|
| 1 | CRITICAL-3 (env placeholders + startup guard) | 20 phút |
| 2 | CRITICAL-1 (Casso REST verify) | 2-3 tiếng |
| 3 | HIGH-3 (bỏ tolerance 1000 VND) | 5 phút |
| 4 | HIGH-2 (opaque token + reference dài) | 2 tiếng |
| 5 | HIGH-1 + HIGH-4 (rate limit) | 1 tiếng |
| 6 | CRITICAL-2 (comment `tx.when` untrusted) | 10 phút |

### Trước launch thật (~4 tiếng)

| Thứ tự | Lỗi | Effort |
|---|---|---|
| 7 | M-3 (Casso IP allowlist) | 1 tiếng |
| 8 | M-4 (batch-size cap) | 15 phút |
| 9 | M-6 (reject CORS `*` trong prod) | 10 phút |
| 10 | M-7 (proxy VietQR image) | 2 tiếng |
| 11 | M-8 (correlation id unification) | 30 phút |

### Nice to have

- Xóa hoặc implement `failed` state
- Monitoring/alerting cho `mismatched`, `duplicates`, auth failures
- Cron detector: payment `pending` quá `expiresAt + 30min` chưa reconcile

---

## 3 câu hỏi product cần trả lời

| # | Câu hỏi | Hiện tại | Cần quyết |
|---|---|---|---|
| Q-1 | Late webhook (sau expiry) có honor không? | Có | Giữ hay reject? |
| Q-2 | User chuyển sai amount → xử lý sao? | Stuck `pending`, không ai được thông báo | Refund flow? Manual reconcile? |
| Q-3 | Trạng thái `failed` dùng làm gì? | Dead state | Implement admin chargeback, hay xóa? |

---

## Scope audit

Đã đọc toàn bộ:
- `backend/src/payments/` (controller, service, schema, module)
- `backend/src/pricing/` (controller, module)
- `backend/src/common/zod-validation.pipe.ts`
- `backend/src/main.ts` (CORS bootstrap)
- `backend/.env.example`
- `shared/schemas/payment.ts`
- `frontend/src/features/payment/hooks/payment-queries.ts`
- `frontend/src/features/payment/components/BankDetails.tsx`
- `frontend/src/routes/pricing.tsx`
- `frontend/src/routes/pay.$paymentId.tsx`

Report chi tiết (tiếng Anh): [.planning/security-audit/payments-audit.md](payments-audit.md)
