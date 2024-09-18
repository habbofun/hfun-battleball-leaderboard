import { HobbaGroup, Hobba as OriginalHobba } from '@prisma/client';

export type Hobba = OriginalHobba & { hobbaGroup: HobbaGroup };
