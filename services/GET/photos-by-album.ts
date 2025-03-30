import { API_URL } from '@env';
import axios, { isAxiosError } from 'axios';

interface IGetPhotos {
  albumID?: string;
}

export const GetPhotosByAlbum = async ({ albumID }: IGetPhotos) => {
  if (!API_URL) {
    throw new Error('API_URL is not defined');
  }

  try {
    const response = await axios.get(`${API_URL}/photos`, {
      params: {
        albumId: albumID,
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
