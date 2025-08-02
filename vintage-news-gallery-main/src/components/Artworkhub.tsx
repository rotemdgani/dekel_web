import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ArtworkModal from "@/components/ui/artwork-modal";
import "./Artworkhub.css";
import women2_framed from '@/assets/women2_framed.png';
import women2 from '@/assets/women2.png';
import profile_vintage from '@/assets/profile_vintage.png';
import shagal from '@/assets/shagal.jpg';
import earth from '@/assets/earth.jpg';
import oldman_vintage from '@/assets/oldman_vintage.png';
import profile_vintage2 from '@/assets/profile2_vintage.png';
import butterflies from '@/assets/butterflies.jpg';
import enjoy from '@/assets/enjoy.png';
import flower_hear_himinai from '@/assets/flower_hear_himinai.png';
import women_read_book from '@/assets/women_read_book.png';
import b2 from '@/assets/b2.png';
import bride_under_attack from '@/assets/bride_under_attack.png';
import calurful_rocket from '@/assets/calurful_rocket.png';
import david_goliat from '@/assets/david_goliat.png';
import dove_among_crawl from '@/assets/dove_among_crawls.png';
import Haminai from '@/assets/Haminai.png';
import news_vs_bussines from '@/assets/news_vs_bussines.png';
import nyt_cover_earth from '@/assets/nyt_cover_earth.png';
import shagal_over_the_city from '@/assets/shagal_over_the_city.png';
import telaviv_rocket from '@/assets/telaviv_rocket.png';
import terror_shiled from '@/assets/terror_shiled.png';
import gift_perpel from '@/assets/gift_perpel.png';
import gift_pink from '@/assets/gift_pink.png';
import gift_star_red from '@/assets/gift_star_red.png';
import red_gift_yellow_card from '@/assets/red_gift_yellow_card.png';
import butterflies_attack from '@/assets/butterflies attack.png';
import ooo from '@/assets/ooo.png';
import orange_sky from '@/assets/orange_sky.png';
import pink_fileds from '@/assets/pink_fileds.png';
import pink_line from '@/assets/pink_line.png';
import sky_grey_helicopter from '@/assets/sky_grey_helicopter.png';
import sky_newspaper_collage from '@/assets/sky_newspaper_collage.png';
import sky_wheat from '@/assets/sky_wheat.png';
import summer_flowers_red from '@/assets/summer_flowers_red.png';
import art_vs_war from '@/assets/art_vs_war_.png';

const ArtworkHub = () => {
    const [cart, setCart] = useState<number[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const { toast } = useToast();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState<any>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // לעקוב אחר התמונה הנוכחית

    const artworks = [
        {
            id: 1,
            title: "Built by Men",
            category: "face-card",
            price: 500,
            medium: "Newspaper collage on wood",
            dimensions: "27.9\" x 35.6\"",
            images: [women2_framed, women2],
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 2,
            title: "Side Note",
            category: "face-card",
            price: 1200,
            medium: "Newspaper collage with acrylic",
            dimensions: "27.9\" x 35.6\"",
            images: [profile_vintage, flower_hear_himinai], // שתי תמונות
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 4,
            title: "Half Truth",
            category: "face-card",
            price: 1500,
            medium: "Newspaper collage with acrylic",
            dimensions: "45\" x 60\" (include the frame)",
            image: oldman_vintage,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 5,
            title: "The Reader",
            category: "face-card",
            price: 500,
            medium: "Newspaper collage with acrylic",
            dimensions: "27.9\" x 35.6\"",
            images: [profile_vintage2, women_read_book], // שתי תמונות
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 7,
            title: "Peace Bomber",
            category: "based-on-a-true-story",
            price: 1500,
            medium: "Mixed media with modern techniques",
            dimensions: "110\" x 100\"",
            image: b2,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 8,
            title: "Bride Interrupted",
            category: "based-on-a-true-story",
            price: 1500,
            medium: "Mixed media with modern techniques",
            dimensions: "110\" x 100\"",
            image: bride_under_attack,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 9,
            title: "Rocket Pop",
            category: "based-on-a-true-story",
            price: 1500,
            medium: "Mixed media with modern techniques",
            dimensions: "110\" x 100\"",
            image: calurful_rocket,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 10,
            title: "David and Goliath",
            category: "based-on-a-true-story",
            price: 1500,
            medium: "Mixed media with modern techniques",
            dimensions: "110\" x 100\"",
            image: david_goliat,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 11,
            title: "Dove Among Crows",
            category: "based-on-a-true-story",
            price: 1500,
            medium: "Mixed media with modern techniques",
            dimensions: "110\" x 100\"",
            image: dove_among_crawl,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 12,
            title: "Window to Hope",
            category: "based-on-a-true-story",
            price: 1500,
            medium: "Mixed media with modern techniques",
            dimensions: "110\" x 100\"",
            image: Haminai,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 13,
            title: "News vs. Business",
            category: "based-on-a-true-story",
            price: 1500,
            medium: "Mixed media with modern techniques",
            dimensions: "110\" x 100\"",
            image: news_vs_bussines,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 14,
            title: "Blinded Earth",
            category: "based-on-a-true-story",
            price: 1100,
            medium: "Mixed media with modern techniques",
            dimensions: "60\" x 80\"",
            image: nyt_cover_earth,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 15,
            title: "Over the Headlines (Homage to Marc Chagall)",
            category: "based-on-a-true-story",
            price: 1200,
            medium: "Mixed media with modern techniques",
            dimensions: "60\" x 80\"",
            image: shagal_over_the_city,
            description: "",
            availability: "SOLD",
            isLimited: false,
        },
        {
            id: 16,
            title: "Rocket Mode",
            category: "based-on-a-true-story",
            price: 1500,
            medium: "Mixed media with modern techniques",
            dimensions: "110\" x 100\"",
            image: telaviv_rocket,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 17,
            title: "Violin vs. Violence",
            category: "based-on-a-true-story",
            price: 1100,
            medium: "Mixed media with modern techniques",
            dimensions: "60\" x 80\"",
            image: art_vs_war,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 18,
            title: "Media as a Shield",
            category: "based-on-a-true-story",
            price: 1300,
            medium: "Mixed media with modern techniques",
            dimensions: "90\" x 110\"",
            image: terror_shiled,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 19,
            title: "To You",
            category: "present",
            price: 1100,
            medium: "Newspaper collage and distressed acrylic on canvas",
            dimensions: "60\" x 80\" x 3\"",
            image: red_gift_yellow_card,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 20,
            title: "Enjoy",
            category: "present",
            price: 800,
            medium: "Newspaper collage and distressed acrylic on canvas",
            dimensions: "30\" x 30\" x 3\"",
            image: gift_star_red,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 21,
            title: "Best Wishes",
            category: "present",
            price: 800,
            medium: "Newspaper collage and distressed acrylic on canvas",
            dimensions: "30\" x 40\" x 3\"",
            image: gift_pink,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 22,
            title: "With Love",
            category: "present",
            price: 1100,
            medium: "Newspaper collage and distressed acrylic on canvas",
            dimensions: "40\" x 40\" x 6\"",
            image: gift_perpel,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 23,
            title: "Butterfly Attack",
            category: "the-good-times",
            price: 900,
            medium: "Acrylic on Canvas",
            dimensions: "120\" x 80\"",
            image: butterflies_attack,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 24,
            title: "OOO",
            category: "the-good-times",
            price: 900,
            medium: "Acrylic on Canvas",
            dimensions: "120\" x 80\"",
            image: ooo,
            description: "",
            availability: "SOLD",
            isLimited: false,
        },
        {
            id: 25,
            title: "Orange Sky",
            category: "the-good-times",
            price: 900,
            medium: "Acrylic on Canvas",
            dimensions: "120\" x 80\"",
            image: orange_sky,
            description: "",
            availability: "SOLD",
            isLimited: false,
        },
        {
            id: 26,
            title: "Pink Fields",
            category: "the-good-times",
            price: 900,
            medium: "Acrylic on Canvas",
            dimensions: "120\" x 80\"",
            image: pink_fileds,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 27,
            title: "Headline Erased",
            category: "the-good-times",
            price: 900,
            medium: "Acrylic on Canvas",
            dimensions: "120\" x 80\"",
            image: pink_line,
            description: "",
            availability: "Available",
            isLimited: false,
        },
        {
            id: 28,
            title: "In the Cloud",
            category: "the-good-times",
            price: 900,
            medium: "Acrylic on Canvas",
            dimensions: "120\" x 80\"",
            image: sky_grey_helicopter,
            description: "",
            availability: "SOLD",
            isLimited: false,
        },
        {
            id: 29,
            title: "Summer Collection",
            category: "the-good-times",
            price: 900,
            medium: "Acrylic on Canvas",
            dimensions: "120\" x 80\"",
            image: summer_flowers_red,
            description: "",
            availability: "SOLD",
            isLimited: false,
        },
        {
            id: 30,
            title: "Original Feed",
            category: "the-good-times",
            price: 900,
            medium: "Acrylic on Canvas",
            dimensions: "120\" x 80\"",
            image: sky_wheat,
            description: "",
            availability: "SOLD",
            isLimited: false,
        },
        {
            id: 31,
            title: "Grey Blue",
            category: "the-good-times",
            price: 600,
            medium: "Acrylic on Canvas",
            dimensions: "80\" x 60\"",
            image: sky_newspaper_collage,
            description: "",
            availability: "Available",
            isLimited: false,
        },
    ];

    const categories = [
        { name: "The Good Times", description: "A series of hand-painted newspaper covers using 100% acrylic on canvas. The works explore the contrast between the aesthetics of media and the quiet of nature or imagination. Each piece looks like a newspaper, but feels like a moment of stillness." },
        { name: "Based on a True Story", description: "A mixed media series combining acrylic painting with newspaper collage, based on real-world events. The works offer a subjective reflection and visual critique, blending fact and feeling into layered narratives." },
        { name: "Face Card", description: "A minimalist portrait series created using full newspaper pages, not traditional collage. Each page is hand-cut like a brushstroke, shaping faces through subtraction. No layering-just one precise cut. Mounted on wood panels, the series explores the relationship between identity and media, while also questioning the boundaries between design and fine art." },
        { name: "Present", description: "A conceptual and critical series presenting the news as a wrapped gift. Beneath the bright ribbons lies the erosion of truth, exhaustion of repetition, and the discomfort we've learned to accept. Each tag reads like a well-wish, but the irony is loud and deliberate." },
    ];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const addToCart = (productId: number) => {
        if (!cart.includes(productId)) {
            setCart([...cart, productId]);
            toast({
                title: "Added to Cart",
                description: "Artwork has been added to your cart.",
            });
        } else {
            toast({
                title: "Already in Cart",
                description: "This artwork is already in your cart.",
                variant: "destructive",
            });
        }
    };

    const toggleFavorite = (productId: number) => {
        if (favorites.includes(productId)) {
            setFavorites(favorites.filter(id => id !== productId));
            toast({
                title: "Removed from Favorites",
                description: "Artwork removed from your favorites.",
            });
        } else {
            setFavorites([...favorites, productId]);
            toast({
                title: "Added to Favorites",
                description: "Artwork added to your favorites.",
            });
        }
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : (selectedArtwork.images?.length || 1) - 1));
    };

    const nextImage = () => {
        setSelectedImageIndex((prev) => (prev < (selectedArtwork.images?.length || 1) - 1 ? prev + 1 : 0));
    };

    return (
        <section id="artworkhub" className="artwork-hub-section">
            <ArtworkModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedImageIndex(0); // איפוס אינדקס התמונה כשהמודאל נסגר
                }}
                artwork={selectedArtwork}
                selectedImageIndex={selectedImageIndex}
                prevImage={prevImage}
                nextImage={nextImage}
            />
            <div className="artwork-hub-container">
                <div className="artwork-hub-header">
                    <h2 className="artwork-hub-title">Gallery</h2>
                    <div className="artwork-hub-divider"></div>
                </div>

                <div className="artwork-hub-content">
                    {categories.map((category) => {
                        const categoryArtworks = artworks.filter(artwork => artwork.category === category.name.toLowerCase().replace(/ /g, "-"));
                        if (categoryArtworks.length > 0) {
                            return (
                                <div key={category.name} className="artwork-hub-category-section">
                                    <h3 className="artwork-hub-category-title">{category.name}</h3>
                                    <p className="artwork-hub-category-description">{category.description}</p>
                                    <div className="artwork-hub-category-grid">
                                        {categoryArtworks.map((artwork) => (
                                            <article key={artwork.id} className="artwork-hub-article">
                                                <div className="artwork-hub-article-image">
                                                    <img
                                                        src={artwork.images ? artwork.images[0] : Array.isArray(artwork.image) ? artwork.image[0] : artwork.image}
                                                        alt={artwork.title}
                                                        className="artwork-hub-image"
                                                        loading="lazy"
                                                    />
                                                    <div className="artwork-hub-overlay">
                                                        <div className="artwork-hub-overlay-actions">
                                                            <Button
                                                                size="sm"
                                                                variant="secondary"
                                                                onClick={() => toggleFavorite(artwork.id)}
                                                                className="artwork-hub-favorite-btn"
                                                            >
                                                                <Heart
                                                                    className={`w-4 h-4 ${favorites.includes(artwork.id) ? "fill-accent text-accent" : ""}`}
                                                                />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="secondary"
                                                                onClick={() => {
                                                                    setSelectedArtwork({
                                                                        ...artwork,
                                                                        images: artwork.images || [artwork.image], // ודא שתמיד יש מערך תמונות
                                                                    });
                                                                    setSelectedImageIndex(0); // התחל מהתמונה הראשונה
                                                                    setModalOpen(true);
                                                                }}
                                                                className="artwork-hub-view-btn"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="artwork-hub-article-content">
                                                    <h3 className="artwork-hub-article-title">{artwork.title}</h3>
                                                    <p className="artwork-hub-article-details">
                                                        {artwork.medium} • {artwork.dimensions}
                                                    </p>
                                                    <p className="artwork-hub-article-description">{artwork.description}</p>
                                                    <div className="artwork-hub-article-footer">
                                                        <span className="artwork-hub-article-price">{formatPrice(artwork.price)}</span>
                                                        <p className="artwork-hub-article-availability">{artwork.availability}</p>
                                                        <Button
                                                            className="artwork-hub-add-to-cart"
                                                            onClick={() => addToCart(artwork.id)}
                                                            disabled={cart.includes(artwork.id)}
                                                        >
                                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                                            {cart.includes(artwork.id) ? "In Cart" : "Add to Cart"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>

                {cart.length > 0 && (
                    <div className="artwork-hub-cart-summary">
                        <Card className="artwork-hub-cart-card">
                            <h4 className="artwork-hub-cart-title">Cart Summary</h4>
                            <div className="artwork-hub-cart-items">
                                {cart.map((id) => {
                                    const product = artworks.find((p) => p.id === id);
                                    return product ? (
                                        <div key={id} className="artwork-hub-cart-item">
                                            <span>{product.title}</span>
                                            <span>{formatPrice(product.price)}</span>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                            <div className="artwork-hub-cart-total">
                                <span>Total:</span>
                                <span>
                                    {formatPrice(
                                        cart.reduce((total, id) => {
                                            const product = artworks.find((p) => p.id === id);
                                            return total + (product?.price || 0);
                                        }, 0)
                                    )}
                                </span>
                            </div>
                            <Button className="artwork-hub-checkout-btn">Proceed to Checkout</Button>
                        </Card>
                    </div>
                )}

            </div>
        </section>
    );
};

export default ArtworkHub;