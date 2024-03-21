import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import request from '../../Utils/AxiosUtils';
import { Category } from '../../Utils/AxiosUtils/API';
import SearchCategory from './SearchCategory';
import Loader from '../CommonComponent/Loader';
import CategoryContext from '../../Helper/CategoryContext';
import { toast } from 'react-toastify';

const TreeForm = forwardRef(({ type }, ref) => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState([]);
  const { setCategoryState } = useContext(CategoryContext);

  // Get Category Data
  const { data, refetch, isLoading } = useQuery(
    [Category],
    () => request({ url: Category, params: { type: type } }),
    { enabled: false, refetchOnWindowFocus: false, select: (data) => data.data },
  );

  // mutation
  const deleteCategory = useMutation({
    mutationFn: (id) =>
      request({
        url: `${Category}/${id}`,
        method: 'DELETE',
      }),
    onSuccess: () => {
      toast.success('ลบหมวดหมู่สำเร็จ');
      refetch();
    },
    onError: (error) => {
      if (error?.response?.status === 500) {
        toast.error('ไม่สามารถลบหมวดหมู่นี้ได้ เนื่องจากมีสินค้าในหมวดหมู่นี้');
      } else {
        toast.error('เกิดข้อผิดพลาด');
      }
    },
  });

  const deleteMutate = (id) => {
    // Category Delete Logic here
    deleteCategory.mutate(id);
  };
  useImperativeHandle(ref, () => ({
    call() {
      refetch();
    },
  }));
  // Refetching data while create, delete and update
  useEffect(() => {
    refetch();
  }, [search]);

  useEffect(() => {
    if (data) {
      setCategoryState((prev) => [...data]);
    }
  }, [data, isLoading]);

  if (isLoading) return <Loader />;
  return (
    <SearchCategory
      mutate={deleteMutate}
      setSearch={setSearch}
      data={data}
      active={active}
      setActive={setActive}
      type={type}
    />
  );
});

export default TreeForm;
