import * as React from 'react'
import { Modal, Tooltip} from 'antd'
import JReap from 'jreap-core';
import './index.scss'

const { confirm } = Modal;


/**
 * 用户角色列表
 * param loginInfo 登录信息
 * param showTitle boolean true为展示title
 */

const UserRoleUI: React.FC<any> = (props: any) => {
    const loginInfo = props.loginInfo!

    let staticonList: any
    let currentRole: string;

    if(loginInfo){
        const station = loginInfo.station
        if(station){
            for(let i = 0; i < station.length; i++){
                if(station[i].id == loginInfo.currentStation){
                    currentRole = station[i].name
                }
            }
        }
    }

    // 切换用户岗位
    const handleChangeRole = (e: any) =>{
        const currentId = e.target.getAttribute('data-id')
        const currentName = e.target.getAttribute('data-name')

        if(loginInfo.currentStation == currentId) return
        
        confirm({
            title: `确定要切换到${currentName}吗？`,
            content: `您当前的岗位是：${currentRole}`,
            onOk() {
                window.location.href = JReap.jreapProj + "web/right/auth/changeStation.form?stationId=" + currentId;
            }
        });
    }

    // 判断登录信息是否存在，如果有，则找到station并对其进行判断，
    // 如果有值则取station里的值进行遍历渲染，如果无则取account里的值
    if(loginInfo){
        if( loginInfo.station && loginInfo.station.length > 1) {
            staticonList = <ul className="user-role">
                {
                    loginInfo.station.map( (item: any, index: number) => {
                        const deptName = item.deptName && item.deptName != '' ? ` / ${item.deptName}` : ''
                        const orgName = item.orgName && item.orgName != '' ? ` / ${item.orgName}` : ''
                        const station = item.name + deptName + orgName
                        
                        return props.showTitle ? 
                                <Tooltip title={station}>
                                    <li className={item.id == loginInfo.currentStation ? 'active' : ''} key={index} data-id={item.id}  data-name={item.name} onClick={handleChangeRole}>
                                        <span className={item.id == loginInfo.currentStation ? 'icon iconfont icon-queding' : ''}></span>{station}
                                    </li>
                                </Tooltip> :
                                <li className={item.id == loginInfo.currentStation ? 'active' : ''} key={index} data-id={item.id}  data-name={item.name} onClick={handleChangeRole}>
                                    <span className={item.id == loginInfo.currentStation ? 'icon iconfont icon-queding' : ''}></span>{station}
                                </li>
                    })
                }
            </ul>
        }
    }

    return <div className="station-list">{staticonList}</div>
}

export default UserRoleUI
