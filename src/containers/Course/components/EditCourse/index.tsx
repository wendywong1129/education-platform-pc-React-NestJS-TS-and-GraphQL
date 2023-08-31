import {
  Button,
  Col,
  Drawer, Form, Input, InputNumber, Row, Space, Spin,
} from 'antd';
import { useEffect, useState } from 'react';
import { useCourse, useEditCourseInfo } from '@/services/course';
import UploadImage from '@/components/OSSImageUpload';
import TeacherSelect from '@/components/TeacherSelect';
import {
  ITeacher,
  IValue,
} from '@/utils/types';

const { TextArea } = Input;

interface IProps {
  id?: string;
  // onClose: () => void;
  onClose: (isReload?: boolean) => void;
  // open:boolean
}

const EditCourse = ({
  id,
  onClose,
  // open
}:IProps) => {
  // console.log('editCourse');
  const [form] = Form.useForm();

  const [edit, editLoading] = useEditCourseInfo();

  const [open, setOpen] = useState(true);

  // useCourse();
  /**
   * method 1
   */
  // const { refetch } = useCourse();

  // useEffect(() => {
  //   if (id) {
  //     refetch({
  //       id,
  //     }).then((res) => {
  //       // console.log('res:', res);
  //       form.setFieldsValue(res.data.getCourseInfo.data);
  //     });
  //   }
  // }, [id]);
  /**
   * method 2
   */
  // const { getCourse, data } = useCourse();

  // useEffect(() => {
  //   if (id) {
  //     getCourse({
  //       variables: {
  //         id,
  //       },
  //     });
  //   }
  // }, [id]);

  // useEffect(() => {
  //   if (data) {
  //     form.setFieldsValue(data.getCourseInfo.data);
  //   }
  // }, [data]);
  const { getCourse, loading } = useCourse();

  useEffect(() => {
    const init = async () => {
      if (id) {
        // const res = await getCourse({
        //   variables: {
        //     id,
        //   },
        // });
        const res = await getCourse(id);
        // form.setFieldsValue(res);
        form.setFieldsValue({
          ...res,
          coverUrl: res.coverUrl ? [{ url: res.coverUrl }] : [],
          teachers: res.teachers ? res.teachers.map((item: ITeacher) => ({
            label: item.name,
            value: item.id,
          })) : [],
        });
      } else {
        form.resetFields();
      }
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    // console.log('values:', values);

    if (values) {
      // edit(id, values);
      // edit(id, values, onClose);
      edit(id, {
        ...values,
        coverUrl: values.coverUrl[0].url,
        teachers: values.teachers?.map((item: IValue) => item.value), // array of teacher id
      }, onClose);
    }
  };

  return (
    <Drawer
      title={id ? 'Edit Course' : 'Create Course'}
      width={720}
      open={open}
      // open
      // onClose={onClose}
      // onClose={() => onClose()}
      onClose={() => setOpen(false)}
      afterOpenChange={(o) => !o && onClose()}
      extra={(
        <Space>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button loading={editLoading} onClick={onSubmitHandler} type="primary">
            Submit
          </Button>
        </Space>
      )}
      // forceRender
    >
      <Spin spinning={loading}>
        <Form form={form}>
          <Form.Item
            label="Cover Image"
            name="coverUrl"
            rules={[{
              required: true,
            }]}
          >
            <UploadImage imgCropAspect={2 / 1} />
          </Form.Item>
          <Form.Item
            label="Course Name"
            name="name"
            rules={[{
              required: true,
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lecturer"
            name="teachers"
            rules={[{
              required: true,
            }]}
          >
            <TeacherSelect />
          </Form.Item>
          <Form.Item
            label="Course Description"
            name="desc"
            rules={[{
              required: true,
            }]}
          >
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Row gutter={20}>
            <Col>
              <Form.Item
                label="Limit Number"
                name="limitNumber"
                rules={[{
                  required: true,
                }]}
              >
                <InputNumber min={0} addonAfter="students" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Duration"
                name="duration"
                rules={[{
                  required: true,
                }]}
              >
                <InputNumber min={0} addonAfter="minutes" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Target Group"
            name="group"
            rules={[{
              required: true,
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Base Ability"
            name="baseAbility"
            rules={[{
              required: true,
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Reservation Info"
            name="reserveInfo"
            rules={[{
              required: true,
            }]}
          >
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Form.Item
            label="Refund Info"
            name="refundInfo"
            rules={[{
              required: true,
            }]}
          >
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Form.Item label="Other Info" name="otherInfo">
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};

EditCourse.defaultProps = {
  id: '',
};

export default EditCourse;
