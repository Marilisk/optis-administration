import { Field, Form, Formik } from 'formik';
import c from './LensesAdministration.module.scss';
import { FC, useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { CreateLenFieldArray } from './CreateFieldArray/createLenFieldArray';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IImageUrl, LoadingStatusEnum } from '../../types/types';
import { Preloader } from '../assets/Preloader/Preloader';
import instance, { CLIENT_URL } from '../../redux/API/api';
import { fetchLens } from '../../redux/lensesSlice';
import { FilesDownloader } from './FilesDownLoader/LensFilesDownLoader';
import { initValues } from '../EyewearAdministration/InitValues/lensesInitvalues';
import LensFieldLine from './LensFieldLine/LensFieldLine';

export const LensesAdministration: FC = () => {
    const navigate = useNavigate()
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
        return <div><Preloader minFormat={true} /></div>
    }

    const initialValues = initValues(currentProduct, images);

    return <section className={c.container}>
        <div className={c.header}>
            <h2>{editMode ? '???????????????????????????? ????????????' : '?????????? ??????????'}</h2>
        </div>

        <div className={c.adminWrapper}>
            <div className={c.formikWrapper}>
                <Formik initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={async (values, actions) => {
                        try {

                            console.log('submit', values)
                            /* const { data } = editMode ?
                                await instance.patch(`/lenses/${params.id}`, values)
                                : await instance.post('/lenses', values);
                            const id = data._id;
                            setSuccessMsg(id);
                            console.log('response ', data);
                            if (data.success === true || (editMode && data._id)) {
                                alert('??????????????!');
                                navigate(`/lenses/${params.id || id}`);
                            } */
                        } catch (error) {
                            console.warn(error);
                            alert('???????????? ?????? ???????????????? ????????????');
                        }
                    }}
                >


                    {props => (
                        <Form>
                            <div className={c.form}>

                                <div className={c.inputGroup}>

                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine label='??????????????????' name='category' />
                                        <LensFieldLine label='??????????' name='brand' />
                                    </div>

                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine label='??????????????????????????' name='manufacturer' />
                                        <LensFieldLine label='???????????? ????????????????????????????' name='manufacturerCountry' />
                                    </div>


                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine label='??????????????' name='code' />
                                        <LensFieldLine label='????????' name='price' />
                                    </div>

                                    <div className={c.descriptionInputWrapper}>
                                        <label>
                                            <div>????????????????</div>
                                            <Field component="textarea" id='description' name='description' />
                                        </label>
                                    </div>

                                </div>

                                <div className={c.prescriptionArr}>
                                    <CreateLenFieldArray name='prescription'
                                        array={props.values.prescription}
                                        title={'???????????????????? ????????'} />
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
                                        <LensFieldLine label='???????????? ????????????' name='changePeriod' />
                                        <LensFieldLine label='??????????????????' name='color' />
                                    </div>
                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine label='UVFilter' name='UVFilter' />
                                        <LensFieldLine label='????????????' name='design' />
                                    </div>
                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine label='??????????????????' name='moisture' type='number' />
                                        <LensFieldLine label='???????? ?? ????????????????' name='amountInPack' type='number' />
                                    </div>
                                    <div className={c.longInputsTwoColFlex}>
                                        <LensFieldLine label='?????????????????????????? ??????????????????' name='oxygen' type='number' />
                                        <LensFieldLine label='????????????????' name='material' />
                                    </div>


                                </div>

                                <button className={c.submitBtn}
                                    disabled={currentProduct.status === LoadingStatusEnum.loading
                                        /* || images.main === '' */}
                                    type='submit'>??????????????????</button>


                                {successmsg ?
                                    <NavLink to={`${CLIENT_URL}/lenses/${successmsg}`}>
                                        <p className={c.successLink}>?????????????? ???? ???????????????? ????????????</p>
                                    </NavLink>
                                    : null}
                            </div>


                            <FilesDownloader images={images} setImages={setImages} setFieldValue={props.setFieldValue} />
                        </Form>
                    )}
                </Formik>

            </div>



        </div>


    </section>
}