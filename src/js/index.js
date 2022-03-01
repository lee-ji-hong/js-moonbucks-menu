//step1 요구사항 구현을 위한 전략

//TODO 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [x] 메뉴의 이름을 입력 받고 확인 버튼 클릭으로 추가한다.
// - [x]추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.`
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.
// - [x] enter키가 아닌 다른 키에서 alert가 뜨지 않는다.

//$표시는 html에서 dom element를 가져올 때 관용적으로 많이들 가져온다.
//코드가 길어질때 줄어서 쓰기 편하다

//form태그가 enter를 쳤을 때 자동으로 전송되는 것을 막아준다.
//querySelector: 찾기
//addEventListener: 지정한 유형의 이벤트를 대상이 수신할 때마다 호출할 함수를 설정한다.
// * form이 전송되는 이벤트는 submit이벤트라고 한다.
//preventDefault: 엔터키를 눌렀을 때 막아주는 기능을 한다.

//메뉴의 이름을 입력받는 것
//querySelector로 input의 id값을 찾아서
//keypress라는 함수를 통해 이벤트를 했을때, 이때 사용자가 어떤 값을 입력했는지 찾아야한다.
//그것을 이벤트를 함수에서 받아올 수 가 있다.
//if문을 통해 사용자가 엔터키를 누르면 event.key를 통해서 사용자가 입력한 이벤트 값을 받아올 수 있다는 조건으로 알아낸다

//dom : 자바스크립트를 이용해 html에서 데이터를 가져오고 싶을 때
//innerHTML : 코드에 html를 추가하고 싶을 때 쓰는 거
//element.insertAdjacentHTML(position,text) : 해당 메서드는  HTML이나 XML같은 특정 텍스트를 파싱하고, 특정 위치에 DOM tree안에 원하는 node들을 추가한다.
//이미 사용중인 element는 다시 파싱하지 않는다. 그러므로 element 안에 존재하는 element를 건드리지 않는다. innerHtml보다는 작업이 덜 들고 빠르다

const $ = (selector) => document.querySelector(selector);
const addMenuName = () => {
  //입력값이 비어있을 경우
  if ($("#espresso-menu-name").value === "") {
    alert("값을 입력해주세요.");
    return; //return을 해주면 다음 부분까지 실행되지 않고 종료된다.
  }

  //입력값이 있을 경우
  const espressoMenuName = $("#espresso-menu-name").value;
  const menuItemTemplate = (espressoMenuName) => {
    return `
      <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
  };
  // <!-- beforebegin -->
  //<ul>
  //<!-- afterbegin -->
  //<li></li>
  //<!-- beforeend -->
  //</ul>
  //<!-- afterend -->
  // $("#espresso-menu-list").innerHTML = menuItemTemplate(espressoMenuName);
  $("#espresso-menu-list").insertAdjacentHTML(
    "beforeend",
    menuItemTemplate(espressoMenuName)
  );
  // const 변수 = li 갯수를 카운팅해서 구해보기
  const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
  $(".menu-count").innerText = `총 ${menuCount}개`;
  $("#espresso-menu-name").value = "";
};

function App() {
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenuName();
  });

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

App();
//TODO 메뉴 수정
// - [ ] 메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴수정하는 모달창이 뜬다.
// - [ ] 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

//TODO 메뉴 삭제
// - [ ] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다.
// - [ ] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.
