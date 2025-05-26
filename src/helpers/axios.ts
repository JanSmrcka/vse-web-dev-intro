import { Axios } from 'axios'

const INSIS_ID: string = "mroa00";

export const axios = new Axios({ baseURL: `https://eli-workshop.vercel.app/api/users/${INSIS_ID}/todos`});