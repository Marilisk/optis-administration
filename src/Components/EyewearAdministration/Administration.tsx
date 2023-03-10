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
            <h2>{editMode ? '???????????????????????????? ????????????' : '?????????? ??????????'}</h2>
        </div>

        <h3 className={c.downloaderHead}
            onClick={() => setShowDownloader(!showDownloader)}
            style={showDownloader ? { borderBottomColor: '#ffffff' } : { border: '2px solid #EAEEF6' }}>
            ???????? ({photoLength})
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
                            alert('???????????? ?????? ???????????????? ????????????');
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
                                        <FieldLine label={'????????????????????????'} name={'name'} />
                                        <FieldLine label={'??????????????????'} name={'category'} />
                                    </div>

                                    <div className={c.descriptionInputWrapper}>
                                        <FieldLine label={'????????????????'} name={'description'} />
                                    </div>

                                    <div className={c.inputsTwoColFlex}>
                                        <FieldLine label={'??????????????'} name={'code'} />
                                        <FieldLine label={'????????'} name={'price'} />
                                    </div>

                                    <div className={c.inputsTwoColFlex}>
                                        <FieldLine label={'???????????????????? ????????????????????'} name={'viewsCount'} type='number' />
                                        <FieldLine label={'???????????????????? ??????????????'} name={'buyCount'} type='number' />
                                    </div>

                                    <GenderEdit values={props.values.gender} />

                                </div>

                                <ChecksGroup name='features'
                                    array={props.values.features}
                                    title={'??????????????????????'}
                                    optionsArray={featuresOptionsArray || []} />

                                <CreateFieldArray name='options'
                                    array={props.values.options}
                                    title={'??????????'} />

                                <ChecksGroup name='shape'
                                    array={props.values.shape}
                                    title={'??????????'}
                                    optionsArray={shapeOptionsArray || []} />

                                <ChecksGroup name='color'
                                    array={props.values.color}
                                    title={'????????'}
                                    optionsArray={colorsOptionsArray || []} />

                                <div className={c.inputGroup}>

                                    <h3>??????????????</h3>

                                    <div className={c.inputsTwoColFlex}>
                                        <FieldLine label='???????????????????? ?????????? ????????????????' name='pupillaryDistance' type='pupillaryDistance' />
                                        <FieldLine label='???????????? ????????????, ????' name='frameWidth' type='number' />
                                    </div>

                                    <div className={c.inputsTwoColFlex}>
                                        <FieldLine label='???????????? ????????????????????, ????' name='bridge' type='number' />
                                        <FieldLine label='?????????? ??????????, ????' name='templeLength' type='number' />
                                    </div>

                                    <div className={c.inputsTwoColFlex}>
                                        <FieldLine label='???????????? ??????????, ????' name='lensHeight' type='number' />
                                        <FieldLine label='??????, ??????????' name='weight' type='number' />
                                        <FieldLine label='???????????? ??????????, ????' name='lensWidth' type='number' />
                                    </div>

                                    <div className={c.inputsTwoColFlex}>
                                        <FieldLine label='?????????????????????? ????????????????' name='prescriptionMin' type='number' />
                                        <FieldLine label='???????????????????????? ????????????????' name='prescriptionMax' type='number' />
                                    </div>
                                </div>

                                <ChecksGroup name='material'
                                    array={props.values.material}
                                    title={'????????????????'}
                                    optionsArray={materialOptionsArray || []} />

                                <button className={c.submitBtn}
                                    disabled={currentProduct.status === LoadingStatusEnum.loading || images.main === ''}
                                    type='submit'>
                                    ??????????????????
                                </button>

                                {successmsg ?
                                    <Link to={`https://spboptis.ru/product/${successmsg}`}>
                                        <p className={c.successLink}>?????????????? ???? ???????????????? ????????????</p>
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