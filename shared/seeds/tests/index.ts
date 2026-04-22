import type { Test } from '../../schemas/test'
import { listening001 } from './listening-001'
import { listening002 } from './listening-002'
import { reading001 } from './reading-001'
import { reading002 } from './reading-002'
import { writing001 } from './writing-001'
import { writing002 } from './writing-002'
import { writing003 } from './writing-003'
import { writing004 } from './writing-004'
import { speaking001 } from './speaking-001'
import { speaking002 } from './speaking-002'
import { speaking003 } from './speaking-003'
import { speaking004 } from './speaking-004'

export const seedTests: Test[] = [
  listening001,
  listening002,
  reading001,
  reading002,
  writing001,
  writing002,
  writing003,
  writing004,
  speaking001,
  speaking002,
  speaking003,
  speaking004,
]

export function findSeedTestById(id: string): Test | undefined {
  return seedTests.find((t) => t.id === id)
}
