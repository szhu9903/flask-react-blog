import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import api from '../../api'

export default function OauthCallback() {

  const [ searchParams, _] = useSearchParams();

  useEffect( async () => {
    let code = searchParams.get("code");
    let isLogin = 0;
    if(code){
      let response = await api.user.getGitHubUser(code);
      if(response.data.status === 200){
        let { access_token, token_time, refresh_token, user_info } = response.data.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('token_time', token_time);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('user_info', JSON.stringify(user_info));
        isLogin = 1;
      }
    }
    window.opener.postMessage({isLogin});
    window.close();
  }, [])

  return (
    <div>授权成功</div>
  )
}
