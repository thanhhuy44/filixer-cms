/* eslint-disable @typescript-eslint/no-explicit-any */

export type Pagination = {
  page: number,
  limit: number,
  total: number,
  totalPages: number
}

export type ApiResponse = {
  statusCode: number;
  message: string;
  data: any;
  pagination?: Pagination
};

export type QueryParams = {
  [key: string]: string | number | boolean | undefined
}

export type BreadcrumbType = {
  value: string,
  link: string,
  text: string,
  childs?: BreadcrumbType[]
}

export type MediaAsset = {
  _id: string,
  url: string,
  fieldname: string,
  originalname: string,
  mimetype: string,
  createdAt: string,
  updatedAt: string,
}

export type User = {
  _id: string;
  fullName: string;
  avatar: MediaAsset,
  email: string,
  role: string,
  createdAt: string,
  updatedAt: string,
};

export type Article = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: MediaAsset,
  categories: [],
  author: User,
  status: string,
  viewCount: number,
  keywords: string[],
  isDeleted: boolean,
  createdAt: string,
  updatedAt: string,
}


export type ArticleCollection = {
  _id: string;
  name: string,
  slug: string,
  thumbnail: MediaAsset,
  description: string,
  articles: string[],
  isDeleted: boolean,
  createdAt: string,
  updatedAt: string
}

export type ArticleCategory = {
  _id: string;
  name: string,
  slug: string,
  description: string,
  createdAt: string,
  updatedAt: string,
}

export type ArticleStatus =  'DRAFT' | 'IN_REVIEW' | 'PRIVATE' | 'PUBLIC' | 'REJECTED' | 'DELETED'
