import React, { useEffect, useRef, useState } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import { nanoid, PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { IAssetsItemType } from './types';
import { httpDownloadZip, httpWearList } from '@/services/api';
import { Button, Image, message, Upload } from 'antd';
import { EyeOutlined, UploadOutlined } from '@ant-design/icons';
import { storage } from '@/utils';

const AssetsPage: React.FC = () => {
  const [assetsList, setAssertsList] = useState<string[]>([]);
  const [assetsListVisible, setAssertsVisible] = useState<boolean>(false);
  const [compositeImage, setCompositeImage] = useState('');
  const [compositeImageVisible, setCompositeImageVisible] = useState(false);
  const [loading, setLoading] = useState('');

  const ref = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    formRef.current?.setFieldValue('status', '2');
    formRef.current?.submit();
  }, []);

  const columns: ProColumns<IAssetsItemType>[] = [
    {
      title: '用户id',
      dataIndex: 'userId',
      hideInSearch: true,
    },
    {
      title: '用户名字',
      dataIndex: 'name',
    },
    {
      title: '用户账户',
      dataIndex: 'account',
    },
    {
      title: 'discord账号 ',
      dataIndex: 'discord',
      hideInSearch: true,
    },

    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      valueEnum: {
        2: {
          text: '待合成',
          status: 'Processing',
        },
        3: {
          text: '合成中',
          status: 'Processing',
        },
        4: {
          text: '合成完成',
          status: 'Success',
        },
      },
    },
    {
      title: '资源预览',
      dataIndex: 'uploadImage',
      hideInSearch: true,
      render: (_, records) => {
        return (
          <a
            onClick={() => {
              setAssertsList(records.uploadImage);
              setAssertsVisible(true);
            }}
          >
            <EyeOutlined />
            &nbsp; 预览
          </a>
        );
      },
    },
    {
      title: '合成照预览',
      dataIndex: 'compositeImage',
      hideInSearch: true,
      render: (_, records) => {
        return records.compositeImage ? (
          <a
            onClick={() => {
              setCompositeImage(records.compositeImage);
              setCompositeImageVisible(true);
            }}
          >
            <EyeOutlined />
            &nbsp; 预览
          </a>
        ) : (
          '-'
        );
      },
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '下载资源',
      valueType: 'option',
      key: ' downloadAction',
      render: (_, records) => {
        return (
          <Button
            size="small"
            onClick={() => {
              httpDownloadZip({ id: records.id });
            }}
          >
            下载
          </Button>
        );
      },
    },
    {
      title: '上传合成照',
      valueType: 'option',
      key: 'uploadAction',
      render: (_, records) => {
        return (
          <Upload
            name="file"
            action={`${process.env.prefix}/wear/upload?id=${records.id}`}
            accept="image/jpg,image/png"
            headers={{ Authorization: `Bearer${storage.getToken()}` }}
            showUploadList={false}
            onChange={async (info) => {
              setLoading(records.id);
              if (info.file.status !== 'uploading') {
              }
              if (info.file.status === 'done') {
                const res = info.file.response;
                if (res.code !== 0) {
                  message.error(res.msg);
                  ref.current?.reload();
                  setLoading('');
                  return;
                }
                ref.current?.reload();
                setLoading('');
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                setLoading('');
              }
            }}
          >
            <Button
              icon={<UploadOutlined />}
              type="primary"
              size="small"
              loading={loading === records.id}
            >
              上传
            </Button>
          </Upload>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<IAssetsItemType>
        formRef={formRef}
        actionRef={ref}
        columns={columns}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        request={async (params) => {
          const res = await httpWearList({
            pageNum: params.current,
            pageSize: params.pageSize,
            username: params.name,
            accountAddress: params.account,
            status: params.status,
          });
          const { total, records } = res.data;
          const data = records.map((item: any) => {
            return {
              id: item.id,
              userId: item.accountId,
              name: item.username,
              account: item.accountAddress,
              status: item.status,
              uploadImage: [
                item.parentPic1,
                item.parent2Type === 1 ? item.parentPic2 : item.avatarPic,
              ],
              compositeImage: item.wearMeta.image || '',
              createTime: item.createTime,
              discord: item.discord,
            } as IAssetsItemType;
          });
          return {
            data,
            total,
          };
        }}
      />

      {/* 资源预览 */}
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{
            visible: assetsListVisible,
            onVisibleChange: (val) => setAssertsVisible(val),
          }}
        >
          {assetsList.map((item) => (
            <Image key={nanoid()} width={200} src={item} />
          ))}
        </Image.PreviewGroup>

        {/* 合成照预览 */}
        <Image
          preview={{
            src: compositeImage,
            visible: compositeImageVisible,
            onVisibleChange: (val) => setCompositeImageVisible(val),
          }}
        />
      </div>
    </PageContainer>
  );
};

export default AssetsPage;
