import { Field, Form, Formik } from 'formik';
import c from './LensesAdministration.module.scss';
import { FC, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
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

export const LensesAdministration: FC = () => {
    const params = useParams();
    const [successmsg, setSuccessMsg] = useState(null);
    const dispatch = useAppDispatch()
    const [images, setImages] = useState<IImageUrl>();

    useEffect(() => {
        if (params.id) {
            const fetch = async () => {
                if (params.id) {
                    const response = await dispatch(fetchLens(params.id));
                    console.log(response)
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
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                        try {
                            const { data } = editMode ?
                                await instance.patch(`/lenses/${params.id}`, values)
                                : await instance.post('/lenses', values);
                            const id = data._id;
                            setSuccessMsg(id);
                            if (data.success === true || (editMode && data._id)) {
                                window.location.replace(`${CLIENT_URL}/lenses/${params.id || id}`);
                            }
                        } catch (error) {
                            console.warn(error);
                            alert('ошибка при загрузке товара');
                        }
                    }}
                >

                    {props => (
                        <Form>
                            <div className={c.form}>

                                <div className={c.inputGroup}>

                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine label='категория' name='category' />
                                        <LensFieldLine label='бренд' name='brand' />
                                    </div>

                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine label='производитель' name='manufacturer' />
                                        <LensFieldLine label='страна производитства' name='manufacturerCountry' />
                                    </div>

                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine label='артикул' name='code' />
                                        <LensFieldLine label='цена' name='price' />
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
                                        <LensFieldLine label='период замены' name='changePeriod' />
                                        <LensFieldLine label='цветность' name='color' />
                                    </div>
                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine label='UVFilter' name='UVFilter' />
                                        <LensFieldLine label='дизайн' name='design' />
                                    </div>
                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine label='влажность' name='moisture' type='number' />
                                        <LensFieldLine label='штук в упаковке' name='amountInPack' type='number' />
                                    </div>
                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine label='проницаемость кислорода' name='oxygen' type='number' />
                                        <LensFieldLine label='материал' name='material' />
                                    </div>

                                </div>

                                <LenFilesDownloader images={images} setImages={setImages} setFieldValue={props.setFieldValue} />

                                {/* <button className={c.submitBtn}
                                    disabled={currentProduct.status === LoadingStatusEnum.loading
                                        || images.main === ''}
                                    type='submit'>ОТПРАВИТЬ</button> */}

                                <SubmitButton status={currentProduct.status}
                                    imagesMainLength={images.main.length} />


                                {successmsg ?
                                    <NavLink to={`${CLIENT_URL}/lenses/${successmsg}`}>
                                        <p className={c.successLink}>перейти на страницу товара</p>
                                    </NavLink>
                                    : null}
                            </div>

                        </Form>
                    )}
                </Formik>

            </div>

        </div>

    </section>
}