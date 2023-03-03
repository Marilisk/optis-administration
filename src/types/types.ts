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
    activationLink: string,
    _id: string,
    cart: Array<ICartItem>,
    createdAt: string,
    email: string,
    favourites: string[],
    fullName: string,
    orders: string[]
    isActivated: boolean,
    password: string,
    role: string,
    updatedAt: string,
    __v: number,
};


export interface IImageUrl {
    main: string,
    side?: string,
    perspective?: string,
}


export interface IProduct {
    _id: string,
    category: string,
    name: string,
    code: number,
    description: string,
    price: number,
    gender: string[],
    features: string[],
    options: string[],
    viewsCount: number,
    buyCount: number,
    shape: string[],
    color: string[],
    pupillaryDistance: string,
    frameWidth: number,
    lensWidth: number,
    bridge: number,
    templeLength: number,
    lensHeight: number,
    weight: number,
    material: string[],
    prescriptionMin: string,
    prescriptionMax: string,
    imageUrl: IImageUrl /* | null */
    size?:string

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
}

export type ICartItem = {
    productId: string
    quantity: number
    leftLens: number
    rightLens: number
    cat: CatEnum
    //lens: number
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
    subscribeData: ISubscribeData
    totalCartSum: object,
}

export type ProdInitialStateType = {
    products: ProductsType
    currentProduct: CurrentProductType 
    searchResult: SearchResultType
    tags: object
    currentCartWithSums: CartItemWithSumType
    processedOrder: ProcessedOrderType
    cartInLSLength: number
}
export type CurrentProductType = {
    item: IProduct | null
    status: LoadingStatusEnum
}
type SearchResultType = {
    items: IProduct[]
    status: LoadingStatusEnum
}
type CartItemWithSumType = {
    items: ICartItemWithSum[]
    status: LoadingStatusEnum
}
type ProcessedOrderType = {
    order: OrderType | null
    status: LoadingStatusEnum
}
export type OrderType = {
    _id?: string
    cart: Array<ICartItemWithSum>
    address: string
    phoneNumber: string
    paymentMade: boolean
    paymentWay: string
    user?: object 
    userId: string
    condition?: string
    createdAt?: Date
    updatedAt?: Date
    additionalInfo?: string
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

export interface IOrder {
    _id?: string
    cart: Array<ICartItemWithSum>
    address: string
    phoneNumber: string
    paymentMade: boolean
    paymentWay: string
    user?: object 
    userId: string
    condition?: string
    createdAt?: Date
    updatedAt?: Date
    additionalInfo?: string
}
