import classes from './Banner.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import SlideImg from '../../assets/images/banner_slide.jpg';
import { memo } from "react";
import BannerLink from "./BannerLink.tsx";

const Banner = () => {

    return (
        <section className={classes.banner}>
            <div className={classes.bannerContent}>
                <div className={classes.bannerInfo}>
                    <h1 className={classes.bannerTitle}>Стань Лідером Сьогодні!</h1>
                    <p className={classes.bannerText}>Відкрийте свій потенціал і навчіться вести за собою команду до
                        успіху.
                        Наші курси допоможуть вам здобути навички, які змінять ваше лідерство на краще. Підніміть свою
                        кар’єру на новий рівень разом із нами!</p>
                    <div className={classes.bannerControls}>
                        <BannerLink className='blue'>Актуальні</BannerLink>
                        <BannerLink className='yellow'>Усі курси</BannerLink>
                    </div>
                </div>
                <Swiper modules={[Pagination]}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{delay: 3000}}
                        pagination={{
                            el: '.swiper-pagination',
                            renderBullet: (index, className) => {
                                return `<span class="${className}"></span>`;
                            },
                            clickable: true
                        }}>
                    <SwiperSlide>
                        <img src={SlideImg} alt="Slide"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={SlideImg} alt="Slide"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={SlideImg} alt="Slide"/>
                    </SwiperSlide>
                </Swiper>

            </div>
            <div className='swiper-pagination'></div>
            <div className={classes.arrowDown}></div>
        </section>
    );
};

export default memo(Banner);