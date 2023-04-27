import { Field, Form, Formik } from 'formik';
import c from './LensesAdministration.module.scss';
import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateLenFieldArray } from './CreateFieldArray/createLenFieldArray';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IImageUrl, LoadingStatusEnum } from '../../types/types';
import instance, { CLIENT_URL } from '../../redux/API/api';
import { fetchLens } from '../../redux/lensesSlice';
import { LenFilesDownloader } from './FilesDownLoader/LensFilesDownLoader';
import { initValues } from '../EyewearAdministration/InitValues/lensesInitvalues';
import LensFieldLine from './LensFieldLine/LensFieldLine';
import { LoadingDotsPreloader } from '../assets/Preloader/LoadingDots/LoadingDotsPreloader';
import SubmitButton from '../EyewearAdministration/SubmitButton/SubmitButton';
import SuccessMsg from '../EyewearAdministration/SuccessMsg/SuccessMsg';


export const LensesAdministration: FC = () => {
    const params = useParams();
    const [successmsg, setSuccessMsg] = useState(null);
    const dispatch = useAppDispatch()
    const [images, setImages] = useState<IImageUrl>();

    const fetch = useCallback( async () => {
        if (params.id) {
            const response = await dispatch(fetchLens(params.id));
            if (response.payload.imageUrl) {
                setImages(response.payload.imageUrl)
            }
        }
    }, [dispatch, params.id])

    useEffect(() => {
        if (params.id) {
            fetch()
        } else {
            setImages({ main: '', side: '', perspective: '' })
        }
    }, [params.id, dispatch, fetch]);

    const currentProduct = useAppSelector(state => state.lenses.currentProduct);
    const editMode = Boolean(params.id);

    if (currentProduct.status === LoadingStatusEnum.loading || !images) {
        return <div><LoadingDotsPreloader /></div>
    }

    const initialValues = initValues(currentProduct, images);

    return <section className={c.container}>
        <div className={c.header}>
            <h2>{editMode ? 'Редактирование товара' : 'Новый товар'}</h2>
        </div>

        <div className={c.adminWrapper}>
            <div className={c.formikWrapper}>
                <Formik initialValues={initialValues}
                    onSubmit={async (values, actions) => {
                        try {
                            const { data } = editMode ?
                                await instance.patch(`/lenses/${params.id}`, values)
                                : await instance.post('/lenses', values);
                            const id = data._id;
                            setSuccessMsg(id);
                            if (data.success === true || (editMode && data._id)) {
                                window.location.replace(`${CLIENT_URL}/lenses/${params.id || id}`);
                                actions.resetForm()
                            }
                        } catch (error) {
                            console.warn(error);
                            alert('ошибка при загрузке товара');
                        }
                    }}>

                    {props => (
                        <Form>
                            <div className={c.form}>

                                <div className={c.inputGroup}>

                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine error={props.errors.category} label='категория' name='category' />
                                        <LensFieldLine error={props.errors.brand} label='бренд' name='brand' />
                                        <LensFieldLine error={props.errors.manufacturer} label='производитель' name={'manufacturer'} />
                                        <LensFieldLine error={props.errors.manufacturerCountry} label='страна' name={'manufacturerCountry'} />
                                        <LensFieldLine error={props.errors.code} label='артикул' name='code' />
                                        <LensFieldLine error={props.errors.price} label='цена' name='price' />
                                        <LensFieldLine error={props.errors.inStockQuantity} label='в наличии' name='inStockQuantity' />
                                    </div>

                                    <div className={c.descriptionInputWrapper}>
                                        <label>
                                            <div>описание</div>
                                            <Field component="textarea" id='description' name='description' />
                                        </label>
                                    </div>

                                </div>

                                <div className={c.prescriptionArr}>
                                    <CreateLenFieldArray name='prescription'
                                        array={props.values.prescription}
                                        title={'Оптическая сила'} />
                                </div>

                                <CreateLenFieldArray name='BC'
                                    array={props.values.BC}
                                    title={'BC'} />
                                <CreateLenFieldArray name='CYL'
                                    array={props.values.CYL}
                                    title={'CYL'} />

                                <CreateLenFieldArray name='AX'
                                    array={props.values.AX}
                                    title={'AX'} />

                                <div className={c.inputGroup}>

                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine error={props.errors.changePeriod} label='период замены' name='changePeriod' />
                                        <LensFieldLine label='цветность' name='color' />
                                        <LensFieldLine label='UVFilter' name='UVFilter' />
                                        <LensFieldLine label='дизайн' name='design' />
                                        <LensFieldLine label='влажность' name='moisture' type='number' />
                                        <LensFieldLine error={props.errors.amountInPack} label='штук в упаковке' name='amountInPack' type='number' />
                                        <LensFieldLine error={props.errors.oxygen} label='проницаемость кислорода' name='oxygen' type='number' />
                                        <LensFieldLine error={props.errors.material} label='материал' name='material' />
                                    </div>

                                </div>

                                <LenFilesDownloader images={images} setImages={setImages} setFieldValue={props.setFieldValue} />

                                <SuccessMsg successmsg={successmsg} 
                                    handleReset={props.handleReset}
                                    setSuccessMsg={setSuccessMsg}
                                    categoryUrl={'lenses'} />

                                <SubmitButton status={currentProduct.status}
                                    imagesMainLength={images.main.length}
                                    errors={props.errors} />

                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </section>
}