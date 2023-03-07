import { Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CreateFieldArray from './createFieldArray';
import c from './Administration.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IImageUrl, LoadingStatusEnum } from '../../types/types';
import { fetchProd } from '../../redux/productsSlice';
import { initValues } from './InitValues/EyewearInitvalues';
import instance, { CLIENT_URL } from '../../redux/API/api';
import FilesDownloader from '../FilesDownLoader/FilesDownLoader';
import GenderEdit from './GenderEdit/GenderEdit';
import ChecksGroup from './ChecksGroup/ChecksGroup';
import { LoadingDotsPreloader } from '../assets/Preloader/LoadingDots/LoadingDotsPreloader';
import FieldLine from './FieldLine/FieldLine.';


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
    const photoLength = useAppSelector(s => s.administrate.imagesAmount)

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

    return <section className={c.container}>
        <div className={c.header}>
            <h2>{editMode ? 'Редактирование товара' : 'Новый товар'}</h2>
        </div>

        <h3 className={c.downloaderHead}
            onClick={() => setShowDownloader(!showDownloader)}
            style={showDownloader ? { borderBottomColor: '#ffffff' } : { border: '2px solid #EAEEF6' }}>
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
                                    setFieldValue={props.setFieldValue} showDownloader={showDownloader}
                                    dispatch={dispatch} />

                                <div className={c.inputGroup}>

                                    <div className={c.longInputsTwoColFlex}>
                                        <FieldLine label={'наименование'} name={'name'} />
                                        <FieldLine label={'категория'} name={'category'} />
                                    </div>

                                    <div className={c.descriptionInputWrapper}>
                                        <FieldLine label={'описание'} name={'description'} />
                                    </div>

                                    <div className={c.inputsTwoColFlex}>
                                        <FieldLine label={'артикул'} name={'code'} />
                                        <FieldLine label={'цена'} name={'price'} />
                                    </div>

                                    <div className={c.inputsTwoColFlex}>
                                        <FieldLine label={'количество просмотров'} name={'viewsCount'} type='number' />
                                        <FieldLine label={'количество покупок'} name={'buyCount'} type='number' />
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
                                        <FieldLine label='расстояние между зрачками' name='pupillaryDistance' type='pupillaryDistance' />
                                        <FieldLine label='ширина оправы, мм' name='frameWidth' type='number' />
                                    </div>

                                    <div className={c.inputsTwoColFlex}>
                                        <FieldLine label='ширина переносицы, мм' name='bridge' type='number' />
                                        <FieldLine label='длина дужки, мм' name='templeLength' type='number' />
                                    </div>

                                    <div className={c.inputsTwoColFlex}>
                                        <FieldLine label='высота линзы, мм' name='lensHeight' type='number' />
                                        <FieldLine label='вес, грамм' name='weight' type='number' />
                                        <FieldLine label='ширина линзы, мм' name='lensWidth' type='number' />
                                    </div>

                                    <div className={c.inputsTwoColFlex}>
                                        <FieldLine label='минимальные диоптрии' name='prescriptionMin' type='number' />
                                        <FieldLine label='максимальные диоптрии' name='prescriptionMax' type='number' />
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