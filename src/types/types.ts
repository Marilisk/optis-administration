export type ILData = {
    data?: IUser | null
    status: LoadingStatusEnum
    serverMessage: string
} 
export type ISubscribeData = {
    email: string
    responseMsg: string
}

export type IUser = {
    activationLink: string
    _id: string
    cart: Array<ICartItem>
    createdAt: string
    email: string
    favourites: string[]
    fullName: string
    avatarUrl?: string
    orders: string[]
    isActivated: boolean
    password: string
    role: string
    updatedAt: string
    __v: number
};


export interface IImageUrl {
    main: string,
    side?: string,
    perspective?: string,
}


export interface IProduct {
    _id: string
    category: string
    name: string
    code: number
    description: string
    price: number
    gender: string[]
    features: string[]
    options: string[]
    viewsCount: number
    buyCount: number
    shape: string[]
    color: string[]
    pupillaryDistance: string
    frameWidth: number
    lensWidth: number
    bridge: number
    templeLength: number
    lensHeight: number
    weight: number
    material: string[]
    prescriptionMin: string
    prescriptionMax: string
    imageUrl: IImageUrl 
    size?:string
    inStockQuantity?: number
}

export interface ILensProduct {
    _id: string
    category: string
    brand: string
    manufacturer: string 
    manufacturerCountry: string
    code: number
    description: string
    price: number
    prescription: number[]
    BC: number[]
    CYL: number[]
    AX: number[]
    changePeriod: string
    color: string
    UVFilter: boolean
    design: string
    moisture: number
    amountInPack: number
    oxygen: number
    material: string
    user?: object
    imageUrl: IImageUrl
    inStockQuantity?: number
}

export type ICartItem = {
    productId: string
    quantity: number
    leftLens: number
    rightLens: number
    cat: CatEnum
}
export type ICartItemWithSum = {
    productId: string
    quantity: number
    leftLens: number
    rightLens: number
    price: number
    cat: CatEnum
}

export enum LoadingStatusEnum {
    loading = 'isLoading',
    loaded = 'loaded',
    error = 'error',
}
type ProductsType = {
    items:  IProduct[]
    status: LoadingStatusEnum
}

export enum CatEnum {
    eyewear = 'eyewear',
    contactLens = 'contactLens'
}
export type AuthInitStateType = {
    loginData: ILData
}

export type ProdInitialStateType = {
    products: ProductsType
    currentProduct: CurrentProductType 
    searchResult: SearchResultType
    tags: object
    alarmWindow: {
        isShown: boolean
        text: string
        confirmed: boolean
    }
}
export type CurrentProductType = {
    item: IProduct | null
    status: LoadingStatusEnum
}
type SearchResultType = {
    items: IProduct[]
    status: LoadingStatusEnum
}

export type LensesInitialStateType = {
    products: LensProductsType
    currentProduct: CurrentLensType
}
export type LensProductsType = {
    items: ILensProduct[]
    status: LoadingStatusEnum
}
export type CurrentLensType = {
    item: ILensProduct | null
    status: LoadingStatusEnum
}

export interface IFileFromList {
    name: string
    owner?: IProduct[] | ILensProduct[] | null
}

export type OrderConditionsType = 'created' | 'confirmed' | 'assemblied' | 'manufacturing' | 'send to manufactory' |
'processed manufactory' | 'ready for courier' | 'in delivery' | 'deleted' | 'delivered';


export interface IOrder {
    _id: string
    cart: Array<ICartItemWithSum>
    address: string
    phoneNumber: string
    paymentMade: boolean
    paymentWay: string
    user?: object 
    userId: string
    condition: OrderConditionsType
    createdAt: Date
    updatedAt?: Date
    additionalInfo?: string
    manager?: string
}

export type AdminRequestValuesType = {
    email: string
    fullName: string
    role: string
}

type SortTagType = {
    id: number 
    label: string
    name: string
}
type SortType = {
    tags: SortTagType[]
    chosenTagId: number
}
type FilterType = {
    id: number
    name: string
}
export type FeaturesInitialStateType = {
    filters:  {
        options: FilterType[]
        chosenOption: FilterType 
    }
    sortTags: SortType
    /* status: string
    filteredProducts: IProduct[]
    goodsAmount: number */
}
