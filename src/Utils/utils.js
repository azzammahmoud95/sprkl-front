import axios from 'axios';

export const axiosReq =
  (method, url, header, body, params) => async (dispatch) => {
    try {
      let response = await axios({
        method: method,
        url: url,
        headers: header,
        data: body,
        withCredentials: true,
        params: params,
      });
      return { success: 1, data: response?.data };
    } catch (error) {
      if (
        error?.response?.data?.message === "AccessTokenExpired" ||
        error?.response?.data?.message === "jwt expired"
      ) {
        try {
          let res = await axios({
            method: "post",
            url: process.env.REACT_APP_API + "/auth/refresh",
            headers: {},
            data: {},
            withCredentials: true,
          });
          try {
            let response = await axios({
              method: method,
              url: url,
              headers: header,
              data: body,
              withCredentials: true,
              params: params,
            });
            return { success: 1, data: response?.data };
          } catch (error) {
            return { success: 0, data: error?.response?.data };
          }
        } catch (err) {
          if (!window.location.href.includes("login"))
            window.location.href = "/login";
          else {
            return { success: 0, data: error?.response?.data };
          }
        }
      } else {
        return { success: 0, data: error?.response?.data };
      }
    }
  };
