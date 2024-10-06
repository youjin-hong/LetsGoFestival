import CardList from "../../components/CardList";
import { useFestivalWishStore } from "../../store/festivalWishStore";
import NoneItemPage from "../NoneItemPage/NoneItemPage";

export default function WishListPage() {
  const { wishList } = useFestivalWishStore();

  // wishList가 비어있는지 확인
  const hasWishedItems = Object.keys(wishList).length > 0;

  return !hasWishedItems ? <NoneItemPage /> : <CardList clickWishIcon={true} />;
}
