import React from 'react'
import { Col, Row, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import MediaCard from './media-card'
import UserMediaCard from './user-media-card'

function MediaList (props) {
  return (
    <div style={{ width: '70%', margin: '3rem auto' }}>
      <Row gutter={[36, 16]}>
        {props.data.filter(media => media !== null).map(media => {
          let temp_media = {
            ...media,
            title: (media.title) ? media.title : '',
            location: (media.location) ? media.location : '대한민국',
            year: (media.year) ? media.year : '',
            author: (media.author) ? media.author : { name: 'Unknown', profileImgUrl: '' },
            isProcessing: (media.isProcessing) ? media.isProcessing : false,
          }
          temp_media.author.name = (temp_media.author.name) ? temp_media.author.name : 'Unknown'
          temp_media.author.profileImgUrl = (temp_media.author.profileImgUrl) ? temp_media.author.profileImgUrl : ''
          if (temp_media.isProcessing === true)
            if (window.location.pathname === "/user")
              return (
                <Col xs={24} md={12} lg={8} xl={8} key={temp_media.id}>
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 30, color: 'gray' }}/>}>
                    <UserMediaCard title={temp_media.title} location={temp_media.location} year={temp_media.year}
                              author={temp_media.author} id={temp_media.id} url={temp_media.url}/>
                  </Spin>
                </Col>
              )
            else
              return (
                <Col xs={24} md={12} lg={8} xl={8} key={temp_media.id}>
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 30, color: 'gray' }}/>}>
                    <MediaCard title={temp_media.title} location={temp_media.location} year={temp_media.year}
                              author={temp_media.author} id={temp_media.id} url={temp_media.url}/>
                  </Spin>
                </Col>
              )
          else
            if (window.location.pathname === "/user")
                return (
                  <Col xs={24} md={12} lg={8} xl={8} key={temp_media.id}>
                    <UserMediaCard title={temp_media.title} location={temp_media.location} year={temp_media.year}
                          author={temp_media.author} id={temp_media.id} url={temp_media.url}/>
                  </Col>
                )
            return (
              <Col xs={24} md={12} lg={8} xl={8} key={temp_media.id}>
                <MediaCard title={temp_media.title} location={temp_media.location} year={temp_media.year}
                        author={temp_media.author} id={temp_media.id} url={temp_media.url}/>
              </Col>
            )
        })}
      </Row>
    </div>
  );
}

export default MediaList;