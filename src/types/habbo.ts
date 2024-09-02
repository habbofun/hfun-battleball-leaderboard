export interface HabboUserInfo {
  uniqueId: string;
  name: string;
  figureString: string;
  motto: string;
  online: boolean;
  lastAccessTime: string;
  memberSince: string;
  profileVisible: boolean;
  currentLevel: number;
  currentLevelCompletePercent: number;
  totalExperience: number;
  starGemCount: number;
  selectedBadges: Badge[];
  bouncerPlayerId: string;
}

interface Badge {
  badgeIndex: number;
  code: string;
  name: string;
  description: string;
}

export interface HabboErrorResponse {
  error: string;
}
