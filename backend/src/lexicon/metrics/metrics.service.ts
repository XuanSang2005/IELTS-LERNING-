import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import type { LexiconDiscipline } from '@shared/schemas/lexicon'
import type { RetentionMetrics, SrsBox } from '@shared/schemas/srs'
import { SrsCardDoc, type SrsCardDocument } from '../schemas/srs-card.schema'

@Injectable()
export class MetricsService {
  constructor(@InjectModel(SrsCardDoc.name) private readonly cardModel: Model<SrsCardDocument>) {}

  async getRetention(params: {
    userId: string
    discipline: LexiconDiscipline
  }): Promise<RetentionMetrics> {
    const { userId, discipline } = params
    const userObjectId = new Types.ObjectId(userId)
    const cards = await this.cardModel.find({ userId: userObjectId, discipline }).lean().exec()

    const perBox: RetentionMetrics['perBox'] = ([1, 2, 3, 4, 5] as SrsBox[]).map((box) => {
      const inBox = cards.filter((c) => c.box === box)
      const reviewCount = inBox.reduce((sum, c) => sum + c.totalReviews, 0)
      const correctCount = inBox.reduce((sum, c) => sum + c.totalCorrect, 0)
      return {
        box,
        cardCount: inBox.length,
        reviewCount,
        accuracy: reviewCount > 0 ? correctCount / reviewCount : 0,
      }
    })

    return {
      discipline,
      perBox,
      totalIntroduced: cards.length,
      totalMature: cards.filter((c) => c.status === 'mature').length,
      totalLearning: cards.filter((c) => c.status === 'learning').length,
    }
  }
}
