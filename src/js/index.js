//step2요구사항 - 상태 관리로 메뉴 관리하기

//TODO localStorage Read & Write
//- [x] localStorage에 데이터를 저장한다.
//- [x] 메뉴를 추가할 때
//- [x] 메뉴를 수정할 때
//- [] 메뉴를 삭제할 때
//- [] localStorage에 데이터를 읽어온다.

//TODO 카테고리별 메뉴판 관리
//- [] 에스프레소 메뉴판 관리
//- [] 프라푸치노 메뉴판 관리
//- [] 블렌디드 메뉴판 관리
//- [] 티바나 메뉴판 관리
//- [] 디저트 메뉴판 관리

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
    localStorage.getItem("menu");
  },
};

function App() {
  // 상태(가변하는 데이터) : 메뉴명
  this.menu = [];

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
    this.menu.push({ name: espressoMenuName });
    //상태가 변경되었을 때 바로 저장한다.
    store.setLocalStorage(this.menu);
    const template = this.menu
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
}

const app = new App();
//위의 코드는 아래의 값과 동일한 동작이다.

/*const app = {
  name: "",
};
*/
