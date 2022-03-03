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
//- [] 페이지에 최초로 접근할 때 localStorage에 에스프레소 메뉴를 읽어온다.
//- [] 에스프레소 메뉴가 페이지에 나타난다.

//TODO 품절 상태관리
//- [] 품절 버튼을 추가한다.
//- [] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
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
  //카테고리별로 저장된 메뉴를 가져오기 위해서는 객체형태로 데이터들이 저장되어 있어야 하겠지?
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
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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

    $("#espresso-menu-list").innerHTML = template;
    UpdateMenuCount();
  };
  const UpdateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };
  const addMenuName = () => {
    //입력값이 비어있을 경우
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");
      return; //return을 해주면 다음 부분까지 실행되지 않고 종료된다.
    }

    //입력값이 있을 경우
    const espressoMenuName = $("#espresso-menu-name").value;
    this.menu[this.currentCategory].push({ name: espressoMenuName });
    //상태가 변경되었을 때 바로 저장한다.
    store.setLocalStorage(this.menu);
    render();
    $("#espresso-menu-name").value = "";
  };
  const upateMenuName = (e) => {
    //메뉴를 수정할 때 데이터 저장
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    this.menu[menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  }; //이벤트 객체를 사용하기 때문에 이벤트를 파라미터로 넘겨줄 수 있다.
  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu.splice(menuId, 1);
      store.setLocalStorage(this.menu); //메뉴를 삭제할 때 데이터 저장
      e.target.closest("li").remove();
      UpdateMenuCount();
    }
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      upateMenuName(e);
    }
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });

  $("nav").addEventListener("click", (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      console.log(categoryName);
    }
  });
}

const app = new App();
app.init();
//위의 코드는 아래의 값과 동일한 동작이다.

/*const app = {
  name: "",
};
*/
