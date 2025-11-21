export interface NoticeModel {
  $id: string;
  topic: string;
  file: string;
  $createdAt: string;
  $updatedAt: string;
  $sequence: number;
  $permissions: string[];
  $databaseId: string;
  $tableId: string;
}

export interface NoticesResponse {
  data: NoticeModel[];
  message: string;
  total: number;
}

export interface CreateNoticeRequest {
  topic: string;
  file: string;
}

