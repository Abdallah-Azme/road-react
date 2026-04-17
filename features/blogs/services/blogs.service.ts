import api from '@/lib/api-client';
export interface BlogsResponse {
  data: any;
  status: boolean;
}

export interface BlogDetailResponse {
  data: any;
  status: boolean;
}

/**
 * Fetch all blogs.
 */
export async function fetchBlogs(page: number = 1): Promise<BlogsResponse> {
  return api.get<BlogsResponse>('/blogs', { query: { page } });
}


/**
 * Fetch a single blog by ID.
 * @param id The blog ID
 */
export async function fetchBlogById(id: number | string): Promise<BlogDetailResponse> {
  return api.get<BlogDetailResponse>(`/blog/${id}`);
}
