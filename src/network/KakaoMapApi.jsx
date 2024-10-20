import { useEffect } from "react";

export default function KakaoMapApi({
  latitude,
  longitude,
  card,
  category,
  setNearByPlaces,
}) {
  useEffect(() => {
    const { kakao } = window;
    if (!kakao) return;

    const container = document.getElementById("map"); // 지도를 담을 div
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
      level: 5, // 지도의 레벨(확대, 축소 정도)
    };

    // 지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(container, options);

    // 축제 마커 위치 (위도, 경도)
    const festivalMarkerPosition = new kakao.maps.LatLng(latitude, longitude);

    // 축제 마커 생성
    const festivalMarker = new kakao.maps.Marker({
      position: festivalMarkerPosition,
    });

    // 마커를 지도에 표시
    festivalMarker.setMap(map);

    // 마커 클릭 시 축제 정보와 길찾기 노출
    const infoWindow = new kakao.maps.InfoWindow({
      content: `
        <div style="padding: 2px; font-size: 14px; width: 205px; text-align: center;">
          ${card.title}<br>
          <a href="https://map.kakao.com/link/map/${card.title},${latitude},${longitude}" style="color:blue" target="_blank">큰지도보기</a>
        </div>`,
      removable: true,
    });

    kakao.maps.event.addListener(festivalMarker, "click", () => {
      infoWindow.open(map, festivalMarker);
    });

    // 카테고리로 장소 검색
    if (category) {
      const ps = new kakao.maps.services.Places(map);
      ps.categorySearch(
        category,
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const nearByPlaces = data.slice(0, 4);
            setNearByPlaces(nearByPlaces);

            // 각 장소에 마커 표시
            data.forEach(displayMarker);
          }
        },
        {
          location: new kakao.maps.LatLng(latitude, longitude),
          radius: 2000,
          sort: kakao.maps.services.SortBy.DISTANCE,
        }
      );
    }

    // 장소 마커 표시 함수
    function displayMarker(place) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", () => {
        const infoWindow = new kakao.maps.InfoWindow({
          content: `
            <div style="padding: 5px; font-size: 12px;">
              ${place.place_name}<br>
              <a href="https://map.kakao.com/link/to/${place.id}" style="color:blue;" target="_blank">길찾기</a>
            </div>`,
          removable: true,
        });
        infoWindow.open(map, marker);
      });
    }
  }, [latitude, longitude, card.title, category, setNearByPlaces]);

  return <div id="map" className="w-full h-full" />;
}
