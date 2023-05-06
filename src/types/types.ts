export interface IImage {
    id: number,
    url: string
}

export interface IImageState {
    galleryImages: IImage[],
    templatesImages: IImage[],
    fondImages: IImage[]
}

export interface IAppState {
    selectedMenuItem:  string
}

export interface ISlide {
    id: string,
    images: IImage[]

}

export interface ISlidesState{
    slides: ISlide[],
    page: number
}

export interface IState {
    app: IAppState,
    slides: ISlidesState
    images: IImageState
}
