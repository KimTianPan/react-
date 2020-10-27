import * as React from 'react'
import { message } from 'antd'
import JReap,{ JreapService } from 'jreap-core';
import './index.scss'

/**
 * 换肤界面
 * @param loginInfo 登录信息
 */

const ThemeUI: React.FC<any> = (props: any) => {
    const loginInfo: any = JReap.getSessionAttr('loginInfo')

    // 换肤
    const handleChangeTheme = (e: any) =>{
        const currentIcon = e.target
        const skinId = currentIcon.getAttribute('data-theme')
        const loginInfo: any = JReap.getSessionAttr('loginInfo')
        const accountId = loginInfo && loginInfo.account ? loginInfo.account.id : ''
        let newLoginInfo: any = loginInfo

        // 删除兄弟节点所有的active类
        const iconList =  currentIcon.parentNode.children

        for(let i = 0; i < iconList.length; i++){
            const oldClass = iconList[i].className;
            iconList[i].className = oldClass.replace(' active', '')
        }
        currentIcon.classList.add('active')

        // 将当前肤色存到loginInfo的session中
        if(loginInfo){
            newLoginInfo.nowSkin.id = skinId
            JReap.setSessionAttr('loginInfo',newLoginInfo)
        }

        // 换肤
        JReap.changeTheme()
        JReap.postThemeInfo(JReap.jreapProj,{accountId,skinId}).then((data: any) => {
            // console.log(data)
        })
    }

    return <div className="theme-box">
                {
                    loginInfo && loginInfo.skin && loginInfo.skin.length > 0 ?
                    loginInfo.skin.map( (item: any, index: number) => {
                        return <span key={index} data-theme={item.id} data-name={item.name} className={ loginInfo.nowSkin.id == item.id ?  `icon icon-theme icon-theme-${item.id} active` : `icon icon-theme icon-theme-${item.id}`} onClick={handleChangeTheme}></span>
                    }) : ''
                }
            </div>
}

export default ThemeUI
