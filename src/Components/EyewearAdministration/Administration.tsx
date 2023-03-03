import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CreateFieldArray from './createFieldArray';
import c from './Administration.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IImageUrl, LoadingStatusEnum } from '../../types/types';
import { fetchProd } from '../../redux/productsSlice';
import { initValues } from './InitValues/EyewearInitvalues';
import instance, { CLIENT_URL } from '../../redux/API/api';
import FilesDownloader from '../FilesDownLoader/FilesDownLoader';
import { selectIsAuth } from '../../redux/authSlice';
import GenderEdit from './GenderEdit/GenderEdit';
import ChecksGroup from './ChecksGroup/ChecksGroup';
import { LoadingDotsPreloader } from '../assets/Preloader/LoadingDots/LoadingDotsPreloader';


const Administration: FC = () => {
    const [showDownloader, setShowDownloader] = useState(false)
    const dispatch = useAppDispatch()
    const params = useParams()
    const editMode = Boolean(params.id);
    const optionsAreLoading = useAppSelector(s => s.administrate.status === LoadingStatusEnum.loading)
    const optionsArrays = useAppSelector(s => s.administrate.options) 
    const colorsOptionsArray = optionsArrays.find(el => el.name === 'color')?.items
    const shapeOptionsArray = optionsArrays.find(el => el.name === 'shape')?.items
    const featuresOptionsArray = optionsArrays.find(el => el.name === 'features')?.items
    const materialOptionsArray = optionsArrays.find(el => el.name === 'material')?.items

    const [successmsg, setSuccessMsg] = useState(null)
    const [images, setImages] = useState<IImageUrl>()

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
    
    if (currentProduct.status === LoadingStatusEnum.loading || !images || optionsAreLoading) {
        return <div><LoadingDotsPreloader /></div>
    }

    const initialValues = initValues({ currentProduct, images });

    let photoLength = 0;
    Object.keys(images).forEach(el => {
        if (el !== '') { photoLength += 1 }
    })

    return <section className={c.container}>
        <div className={c.header}>
            <h2>{editMode ? 'Редактирование товара' : 'Новый товар'}</h2>
        </div>

        <h3 className={c.downloaderHead} 
            onClick={() => setShowDownloader(!showDownloader)}
            style={showDownloader ? {borderBottomColor: '#ffffff'} : {border: '2px solid #EAEEF6'}}>
            Фото ({photoLength})
        </h3>

        <div className={c.adminWrapper}>
            <div className={c.formikWrapper}>
                <Formik initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={async (values, actions) => {
                        const genderArr = []
                        genderArr.push(values.gender)
                        actions.setFieldValue('gender', genderArr)
                        //console.log(values)
                        try {
                            const { data } = editMode ?
                                await instance.patch(`/products/${params.id}`, values)
                                : await instance.post('/products', values);
                            const id = data._id;
                            setSuccessMsg(id);
                            if (data._id || (params.id && data.success === true)) {
                                //window.location.replace(`${CLIENT_URL}/product/${params.id || id}`);
                                alert('success! afraid to redirect')
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
                                    setFieldValue={props.setFieldValue} showDownloader={showDownloader} />

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

                                <ChecksGroup name='features'
                                    array={props.values.features}
                                    title={'Особенности'}
                                    optionsArray={featuresOptionsArray || []} />

                                <CreateFieldArray name='options'
                                    array={props.values.options}
                                    title={'Опции'} />

                                <ChecksGroup name='shape'
                                    array={props.values.shape}
                                    title={'Форма'}
                                    optionsArray={shapeOptionsArray || []} />

                                <ChecksGroup name='color'
                                    array={props.values.color}
                                    title={'Цвет'}
                                    optionsArray={colorsOptionsArray || []} />

                                <div className={c.inputGroup}>

                                    <h3>Размеры</h3>

                                    <div className={c.inputsTwoColFlex}>

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

                                    </div>
                                    <div className={c.inputsTwoColFlex}>
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
                                    </div>

                                    <div className={c.inputsTwoColFlex}>

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
                                            <label>ширина линзы, мм
                                                <Field type='number' name='lensWidth' />
                                            </label>
                                        </div>
                                    </div>

                                    <div className={c.inputsTwoColFlex}>
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
                                </div>

                                <ChecksGroup name='material'
                                    array={props.values.material}
                                    title={'Материал'}
                                    optionsArray={materialOptionsArray || []} />

                                <button className={c.submitBtn}
                                    disabled={currentProduct.status === LoadingStatusEnum.loading || images.main === ''}
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

export default React.memo(Administration)