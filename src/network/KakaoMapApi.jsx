import { useEffect } from "react";

export default function KakaoMapApi({
  latitude,
  longitude,
  card,
  category,
  setNearByPlaces,
}) {
  useEffect(() => {
    const loadKakaoMap = () => {
      // 이미 로드된 스크립트가 있는지 확인
      if (
        document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]')
      ) {
        initializeMap();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_APP_KAKAO_API_KEY
      }&libraries=services,clusterer,drawing&autoload=false`;
      script.async = true;

      script.onload = () => {
        // 스크립트 로드 후 kakao.maps SDK 초기화
        window.kakao.maps.load(() => {
          initializeMap();
        });
      };

      document.head.appendChild(script);
    };

    const initializeMap = () => {
      const { kakao } = window;
      if (!kakao || !kakao.maps) return;

      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 5,
      };

      const map = new kakao.maps.Map(container, options);

      // 축제 마커 생성
      const festivalMarkerPosition = new kakao.maps.LatLng(latitude, longitude);
      const festivalMarker = new kakao.maps.Marker({
        position: festivalMarkerPosition,
      });

      festivalMarker.setMap(map);

      // 축제 정보 윈도우
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

      // 카테고리 검색
      if (category) {
        const ps = new kakao.maps.services.Places(map);
        ps.categorySearch(
          category,
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const nearByPlaces = data.slice(0, 4);
              setNearByPlaces(nearByPlaces);
              data.forEach((place) => displayMarker(place, map));
            }
          },
          {
            location: new kakao.maps.LatLng(latitude, longitude),
            radius: 2000,
            sort: kakao.maps.services.SortBy.DISTANCE,
          }
        );
      }
    };

    const displayMarker = (place, map) => {
      const { kakao } = window;
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
    };

    loadKakaoMap();

    // 클린업
    return () => {
      const script = document.querySelector(
        'script[src*="dapi.kakao.com/v2/maps/sdk.js"]'
      );
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [latitude, longitude, card.title, category, setNearByPlaces]);

  return <div id="map" className="w-full h-full" />;
}
