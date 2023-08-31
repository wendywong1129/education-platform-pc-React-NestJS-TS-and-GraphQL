import type { UploadProps } from 'antd';
import {
  // Button,
  Upload,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import type { UploadFile } from 'antd/es/upload/interface';
import { useQuery } from '@apollo/client';
// import { useRef } from 'react';
// import { UploadOutlined } from '@ant-design/icons';
import { GET_OSS_INFO } from '@/graphql/oss';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

interface OSSUploadProps {
  // value?: UploadFile;
  // onChange?: (file?: UploadFile) => void;
  value?: UploadFile[];
  label?: string;
  maxCount?: number;
  imgCropAspect?: number;
  onChange?: (files: UploadFile[]) => void;

}

const OSSImageUpload = ({
  label,
  maxCount,
  imgCropAspect,
  value,
  onChange,
}: OSSUploadProps) => {
  // const keyRef = useRef('');

  const { data, refetch } = useQuery<{ getOSSInfo: OSSDataType }>(GET_OSS_INFO);

  const OSSData = data?.getOSSInfo;

  const getKey = (file: UploadFile) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const key = `${OSSData?.dir}${file.uid}${suffix}`;
    const url = `${OSSData?.host}/${key}`;
    return { key, url };
  };

  // const handleChange: UploadProps['onChange'] = ({ file }) => {
  //   if (file.status === 'removed') {
  //     onChange?.();
  //     return;
  //   }
  //   const newFile = {
  //     ...file,
  //     url: `${OSSData?.host}/${keyRef.current}`,
  //   };
  //   onChange?.(newFile);
  // };
  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    const files = fileList.map((f) => ({
      ...f,
      // url: `${OSSData?.host}/${keyRef.current}`,
      url: f.url || getKey(f).url,
    }));
    onChange?.(files);
  };

  // const getExtraData: UploadProps['data'] = (file) => {
  //   const suffix = file.name.slice(file.name.lastIndexOf('.'));
  //   const filename = Date.now() + suffix;
  //   keyRef.current = `${OSSData?.dir}/${filename}`;
  //   return {
  //     key: keyRef.current,
  //     OSSAccessKeyId: OSSData?.accessId,
  //     policy: OSSData?.policy,
  //     Signature: OSSData?.signature,
  //   };
  // };
  const getExtraData: UploadProps['data'] = (file) => ({
    key: getKey(file).key,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) return false;

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await refetch();
    }
    return file;
  };

  return (
    <ImgCrop rotate aspect={imgCropAspect}>
      <Upload
        name="file"
        maxCount={maxCount}
        listType="picture-card"
        // fileList={value ? [value] : []}
        fileList={value}
        action={OSSData?.host}
        onChange={handleChange}
        data={getExtraData}
        beforeUpload={beforeUpload}
      >
        {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}
        {/* + Change Avatar */}
        {label}
      </Upload>
    </ImgCrop>

  );
};

OSSImageUpload.defaultProps = {
  value: null,
  onChange: () => {},
  label: 'Upload Image',
  maxCount: 1,
  imgCropAspect: 1 / 1,
};

export default OSSImageUpload;
