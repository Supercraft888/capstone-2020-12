import React from 'react';
import { Avatar, List, Typography, Divider } from 'antd';
import MediaDetailDeleteButton from './media-detail-delete-button';
import ImageCompare from './media-detail-card-image-compare';
import MediaAddComment from './media-add-comment';
import MediaCommentQuery from './media-comment-query';

function MediaInfo (props) {
  return (
    <div>
    <List>
      <List.Item
        actions={[
          <div>
            {
            // 작성자와 로그인 정보가 같을 경우에만 deleteButton 보이도록 설정
              (props.media.author.id === sessionStorage.getItem("user_id")) &&
              <MediaDetailDeleteButton mediaId={props.media.id}/>
            }
          </div>
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar size={50} src={props.media.author.profileImgUrl}/>}
          title={<div style={{fontSize: 20}}>{props.media.title}</div>}
          description={<div style={{fontSize: 15}}>{props.media.author.name}</div>}
          style={{ textAlign: 'left' }}
        />
        <div style={{fontSize: 15}}>{props.media.location}<br/>{props.media.year}</div>
      </List.Item>
      <List.Item>
        {props.media.description}
      </List.Item>
    </List>
      <Divider/>
    </div>
  );
}

function MediaDetailCard (props) {
  return (
    <div>
      {/* slider */}
      <ImageCompare url={props.media.url} originalUrl={props.media.originalUrl}/>
      {/* 상세 정보 */}
      <MediaInfo media={props.media}/>
      {/* 댓글 추가 */}
      <MediaAddComment mediaId={props.media.id}/>
      {/* 기존의 댓글들 */}
      <MediaCommentQuery mediaId={props.media.id}/>
    </div>
  );
}

export default MediaDetailCard;
