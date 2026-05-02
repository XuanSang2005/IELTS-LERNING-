import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import type { UserProfile } from '@shared/schemas/practice'
import { User, UserDocument } from './schemas/user.schema'

export function defaultProfile(name: string): UserProfile {
  const nowIso = new Date().toISOString()
  return {
    name,
    startingBand: 0,
    targetBand: 7.5,
    currentWeek: 1,
    phase: 1,
    startDate: nowIso,
    disciplineProgress: {
      grammar: { completed: 0, total: 12 },
      vocabulary: { completed: 0, total: 12 },
      collocations: { completed: 0, total: 12 },
      linking: { completed: 0, total: 12 },
    },
    currentBand: {
      level: 'intermediate',
      estimatedBand: 6.0,
      range: [6.0, 6.5],
      confidence: 'low',
      setBy: 'algorithm',
      updatedAt: nowIso,
    },
    performance: {
      weeklyTestScores: [],
      reviewAccuracy: [],
      writingBands: [],
    },
    lastBandReassessment: null,
    diagnosticCompletedAt: null,
    diagnosticSkippedAt: null,
    diagnosticResult: null,
  }
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase().trim() }).exec()
  }

  findById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null
    return this.userModel.findById(id).exec()
  }

  async create(input: {
    email: string
    passwordHash: string
    name: string
  }): Promise<UserDocument> {
    const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const created = new this.userModel({
      email: input.email.toLowerCase().trim(),
      passwordHash: input.passwordHash,
      name: input.name,
      trialEndsAt,
      isPro: false,
      profile: defaultProfile(input.name),
    })
    return created.save()
  }

  async updateProfile(userId: string, patch: Partial<UserProfile>): Promise<UserDocument | null> {
    const doc = await this.userModel.findById(userId).exec()
    if (!doc) return null
    doc.profile = { ...doc.profile, ...patch }
    await doc.save()
    return doc
  }

  async setProfile(userId: string, profile: UserProfile): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { $set: { profile } }).exec()
  }
}
