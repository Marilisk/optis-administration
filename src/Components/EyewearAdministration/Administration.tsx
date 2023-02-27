import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CreateFieldArray from './createFieldArray';
import c from './Administration.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IImageUrl, LoadingStatusEnum } from '../../types/types';
import { fetchProd } from '../../redux/productsSlice';
import { initValues } from './InitValues/EyewearInitvalues';
import { Preloader } from '../assets/Preloader/Preloader';
import instance from '../../redux/API/api';
import { FilesDownloader } from '../FilesDownLoader/FilesDownLoader';
import { selectIsAuth } from '../../redux/authSlice';
import GenderEdit from './GenderEdit/GenderEdit';


export const Administration: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const editMode = Boolean(params.id);
    const isAuth = useAppSelector(selectIsAuth)

    const [successmsg, setSuccessMsg] = useState(null)
    const [images, setImages] = useState<IImageUrl>()

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')  // or better redirect? 
        }
    }, [isAuth, navigate])
    useEffect(() => {
        if (params.id) {
            const fetch = async () => {
                if (params.id) {
                    const response = await dispatch(fetchProd(params.id));
                    if (response.payload.imageUrl) {
                        setImages(response.payload.imageUrl)
                    }
                }
            }
            fetch()
        } else {
            setImages({ main: '', side: '', perspective: '' })
        }
    }, [params.id, dispatch]);

    const currentProduct = useAppSelector(state => state.products.currentProduct);
    //const editMode = Boolean(params.id);  

    if (currentProduct.status === LoadingStatusEnum.loading || !images /* || !currentProduct.item */) {
        return <div><Preloader minFormat={true} /></div>
    }

    const initialValues = initValues({ currentProduct, images });

    return <section>
        <div className={c.header}>
            <h2>{editMode ? 'Редактирование товара' : 'Новый товар'}</h2>
        </div>

        <div className={c.adminWrapper}>
            <div className={c.formikWrapper}>
                <Formik initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={async (values, actions) => {
                        const genderArr = []
                        genderArr.push(values.gender)
                        actions.setFieldValue('gender', genderArr)
                        try {
                            const { data } = editMode ?
                                await instance.patch(`/products/${params.id}`, values)
                                : await instance.post('/products', values);
                            const id = data._id;
                            setSuccessMsg(id);
                            if (data._id || (editMode && data.success === true)) {
                                navigate(`https://spboptis.ru/product/${params.id || id}`);
                            }
                        } catch (error) {
                            console.warn(error);
                            alert('ошибка при загрузке товара');
                        }
                    }}
                >

                    {props => (

                        <Form>
                            <div>
                                <FilesDownloader images={images} setImages={setImages}
                                    setFieldValue={props.setFieldValue} />

                                <div className={c.inputGroup}>

                                    <div className={c.inputWrapper}>
                                        <label>
                                            <span>категория</span>
                                            <Field id='category' name='category' />
                                        </label>
                                    </div>
                                    <div className={c.inputWrapper}>
                                        <label>
                                            <span>наименование</span>
                                            <Field id='name' name='name' />
                                        </label>
                                    </div>


                                    <div className={c.inputWrapper}>
                                        <label>
                                            <span>описание</span>
                                            <Field id='description' name='description' />
                                        </label>
                                    </div>

                                    <div className={c.inputsTwoColFlex}>

                                        <div className={c.inputWrapper}>
                                            <label>
                                                <span>артикул</span>
                                                <Field id='code' name='code' />
                                            </label>
                                        </div>
                                        <div className={c.inputWrapper}>
                                            <label>
                                                <span>цена</span>
                                                <Field id='price' name='price' />
                                            </label>
                                        </div>
                                    </div>

                                    <div className={c.inputsTwoColFlex}>
                                        <div className={c.inputWrapper}>
                                            <label>
                                                <span>количество просмотров</span>
                                                <Field type='number' name='viewsCount' />
                                            </label>
                                        </div>

                                        <div className={c.inputWrapper}>
                                            <label>
                                                <span>количество покупок</span>
                                                <Field type='number' name='buyCount' />
                                            </label>
                                        </div>
                                    </div>

                                    <GenderEdit values={props.values.gender} />
                                    
                                </div>

                                

                                <CreateFieldArray name='features'
                                    array={props.values.features}
                                    title={'Особенности'} />

                                <CreateFieldArray name='options'
                                    array={props.values.options}
                                    title={'Опции'} />

                                <CreateFieldArray name='shape'
                                    array={props.values.shape}
                                    title={'Форма'} />

                                <CreateFieldArray name='color'
                                    array={props.values.color}
                                    title={'Цвет'} />

                                <div className={c.numberInputGroup}>

                                    <div className={c.inputWrapper}>
                                        <label>расстояние между зрачками
                                            <Field name='pupillaryDistance' />
                                        </label>
                                    </div>

                                    <div className={c.inputWrapper}>
                                        <label>ширина оправы, мм
                                            <Field type='number' name='frameWidth' />
                                        </label>
                                    </div>

                                    <div className={c.inputWrapper}>
                                        <label>ширина линзы, мм
                                            <Field type='number' name='lensWidth' />
                                        </label>
                                    </div>

                                    <div className={c.inputWrapper}>
                                        <label>ширина переносицы, мм
                                            <Field type='number' name='bridge' />
                                        </label>
                                    </div>

                                    <div className={c.inputWrapper}>
                                        <label>длина дужки, мм
                                            <Field type='number' name='templeLength' />
                                        </label>
                                    </div>

                                    <div className={c.inputWrapper}>
                                        <label>высота линзы, мм
                                            <Field type='number' name='lensHeight' />
                                        </label>
                                    </div>

                                    <div className={c.inputWrapper}>
                                        <label>вес, грамм
                                            <Field type='number' name='weight' />
                                        </label>
                                    </div>

                                    <div className={c.inputWrapper}>
                                        <label>минимальные диоптрии
                                            <Field type='text' name='prescriptionMin' />
                                        </label>
                                    </div>

                                    <div className={c.inputWrapper}>
                                        <label>максимальные диоптрии
                                            <Field type='text' name='prescriptionMax' />
                                        </label>
                                    </div>
                                </div>

                                <CreateFieldArray name='material'
                                    array={props.values.material}
                                    title={'Материал'} />


                                <button className={c.submitBtn}
                                    disabled={currentProduct.status === LoadingStatusEnum.loading}
                                    type='submit'>
                                    ОТПРАВИТЬ
                                </button>


                                {successmsg ?
                                    <Link to={`https://spboptis.ru/product/${successmsg}`}>
                                        <p className={c.successLink}>перейти на страницу товара</p>
                                    </Link>
                                    : null}
                            </div>

                        </Form>
                    )}
                </Formik>

            </div>


        </div>
    </section>
}