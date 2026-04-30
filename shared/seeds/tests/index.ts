import type { Test } from '../../schemas/test'
import { listening001 } from './listening-001'
import { listening002 } from './listening-002'
import { listening003 } from './listening-003'
import { listening004 } from './listening-004'
import { listening005 } from './listening-005'
import { listening006 } from './listening-006'
import { listening007 } from './listening-007'
import { listening008 } from './listening-008'
import { listening009 } from './listening-009'
import { listening010 } from './listening-010'
import { reading001 } from './reading-001'
import { reading002 } from './reading-002'
import { reading003 } from './reading-003'
import { reading004 } from './reading-004'
import { reading005 } from './reading-005'
import { reading006 } from './reading-006'
import { reading007 } from './reading-007'
import { reading008 } from './reading-008'
import { reading009 } from './reading-009'
import { reading010 } from './reading-010'
import { writing001 } from './writing-001'
import { writing002 } from './writing-002'
import { writing003 } from './writing-003'
import { writing004 } from './writing-004'
import { writing005 } from './writing-005'
import { writing006 } from './writing-006'
import { writing007 } from './writing-007'
import { writing008 } from './writing-008'
import { writing009 } from './writing-009'
import { writing010 } from './writing-010'
import { speaking001 } from './speaking-001'
import { speaking002 } from './speaking-002'
import { speaking003 } from './speaking-003'
import { speaking004 } from './speaking-004'
import { speaking005 } from './speaking-005'
import { speaking006 } from './speaking-006'
import { speaking007 } from './speaking-007'
import { speaking008 } from './speaking-008'
import { speaking009 } from './speaking-009'
import { speaking010 } from './speaking-010'

export const seedTests: Test[] = [
  listening001,
  listening002,
  listening003,
  listening004,
  listening005,
  listening006,
  listening007,
  listening008,
  listening009,
  listening010,
  reading001,
  reading002,
  reading003,
  reading004,
  reading005,
  reading006,
  reading007,
  reading008,
  reading009,
  reading010,
  writing001,
  writing002,
  writing003,
  writing004,
  writing005,
  writing006,
  writing007,
  writing008,
  writing009,
  writing010,
  speaking001,
  speaking002,
  speaking003,
  speaking004,
  speaking005,
  speaking006,
  speaking007,
  speaking008,
  speaking009,
  speaking010,
]

export function findSeedTestById(id: string): Test | undefined {
  return seedTests.find((t) => t.id === id)
}
