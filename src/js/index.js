//step2요구사항 - 상태 관리로 메뉴 관리하기

//TODO localStorage Read & Write
//- [x] localStorage에 데이터를 저장한다.
//- [x] 메뉴를 추가할 때
//- [x] 메뉴를 수정할 때
//- [x] 메뉴를 삭제할 때
//- [x] localStorage에 데이터를 console로 읽고 저장된 내역이 화면으로 나타난다.
// -> 페이지 최초로 접근 했을 때 localStorage에 저장된 데이터가 있다면 console에 나타나게끔 구현

//TODO 카테고리별 메뉴판 관리
//- [x] 에스프레소 메뉴판 관리
//- [x] 프라푸치노 메뉴판 관리
//- [x] 블렌디드 메뉴판 관리
//- [x] 티바나 메뉴판 관리
//- [x] 디저트 메뉴판 관리

//TODO 페이지 접근시 최초 데이터 Read & Rendering
//- [x] 페이지에 최초로 접근할 때 localStorage에 에스프레소 메뉴를 읽어온다.
//- [x] 에스프레소 메뉴가 페이지에 나타난다.

//TODO 품절 상태관리
//- [x] 품절 버튼을 추가한다.
//- [x] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
//- [x] 품절된 상태의 상품 품절버튼을 클릭하면 다시 되돌아온다.
//- [] 클릭이벤트에서 가장 가까운 li태그의 class속성 값에 sold-out을 추가한다.

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentCategory = "espresso";

  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
  };

  //데이터를 그려주는 logic을 재사용할 수 있게 분리함
  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((menuItem, index) => {
        return `
        <li data-menu-id="${index}" class= " menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${
          menuItem.soldOut ? "sold-out" : ""
        }">${menuItem.name}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        >
          품절
        </button>
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
      })
      .join("");

    $("#menu-list").innerHTML = template;
    UpdateMenuCount();
  };
  const UpdateMenuCount = () => {
    const menuCount = $("#menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };
  const addMenuName = () => {
    //입력값이 비어있을 경우
    if ($("#menu-name").value === "") {
      alert("값을 입력해주세요.");
      return; //return을 해주면 다음 부분까지 실행되지 않고 종료된다.
    }

    //입력값이 있을 경우
    const MenuName = $("#menu-name").value;
    this.menu[this.currentCategory].push({ name: MenuName });
    //상태가 변경되었을 때 바로 저장한다.
    store.setLocalStorage(this.menu);
    render();
    $("#menu-name").value = "";
  };
  const upateMenuName = (e) => {
    //메뉴를 수정할 때 데이터 저장
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  };
  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu); //메뉴를 삭제할 때 데이터 저장
      e.target.closest("li").remove();
      UpdateMenuCount();
    }
  };
  const soldOutMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStorage(this.menu);
    render();
  };

  $("#menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      upateMenuName(e);
      return; //해당 코드를 실행한 후 뒤의 코드를 실행할 필요가 없기 때문에 return하는 습관을 들이는 것이 버그를 줄이는데에 좋다.
    }
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
      return;
    }
    if (e.target.classList.contains("menu-sold-out-button")) {
      soldOutMenu(e);
      return;
    }
  });

  $("#menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#menu-submit-button").addEventListener("click", addMenuName);

  $("#menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });

  $("nav").addEventListener("click", (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      render();
    }
  });
}

const app = new App();
app.init();
