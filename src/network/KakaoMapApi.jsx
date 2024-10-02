import { useEffect } from "react";

const { kakao } = window;

export default function KakaoMapApi({ latitude, longitude }) {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 div
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
      level: 4, // 지도의 레벨(확대, 축소 정도)
    };

    // 지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(container, options);

    // 축제 마커가 표시될 위치 (해당 축제 위치) - DetailPage에서 축제 위치를 잡아줄 것이기 때문에 경도, 위도 값을 넘겨준다.
    let festivalMarkerPosition = new kakao.maps.LatLng(latitude, longitude);
    // 축제 마커 생성
    let festivalMarker = new kakao.maps.Marker({
      position: festivalMarkerPosition,
    });

    // 축제 마커를 지도 위에 표시
    festivalMarker.setMap(map);
  }, [latitude, longitude]);

  return (
    <>
      <div id="map" className="w-full h-full" />
    </>
  );
}

/*
해당 축제 위치 마커로 표시하기 먼저하자. -> 완료
이제 "음식점" 또는 "카페" 버튼을 클릭하면 축제를 중심으로 반경을 정해서 카페 또는 식당 4개를 띄워주자.
*/
