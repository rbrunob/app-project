import { API_URL } from '@env';
import axios, { isAxiosError } from 'axios';

interface IGetPhotos {
  albumID?: number;
  limit?: number;
}

export const GetPhotosByAlbum = async ({ albumID, limit }: IGetPhotos) => {
  if (!API_URL) {
    throw new Error('API_URL is not defined');
  }

  try {
    const response = await axios.get(`${API_URL}/photos`, {
      params: {
        albumId: albumID,
        _limit: limit,
      },
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);

    if (isAxiosError(error)) {
      return { code: error.response?.status, message: error.response?.data.msg };
    }
    return { code: 500, message: 'Erro desconhecido' };
  }
};
