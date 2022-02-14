"use strict";


function startCodeWars() {
  const url = `https://www.codewars.com/api/v1/users/alexalehno/`;
  const url1 = `https://www.codewars.com/api/v1/users/alexalehno/code-challenges/completed`;
  const url2 = `https://www.codewars.com/api/v1/code-challenges/`;
  const overlay = document.querySelector('.overlay-preloader');
  let elemUl = null;


  getInfo(url).then(data => {
    const info = [data.username, data.honor, data.ranks.overall.name, data.codeChallenges.totalCompleted];
    const items = document.querySelectorAll('.info-item');
    items.forEach((el, i) => el.lastChild.textContent = info[i]);
    overlay.classList.add('hidden');
  })

  document.querySelector('#completed-btn').addEventListener('click', () => {
    overlay.classList.remove('hidden');

    getInfo(url1).then(data => {
      const dataList = data.data;
      const ul = createEl('ul', 'kata-list');
      let str = '';

      if (elemUl) elemUl.remove();
      elemUl = ul;

      for (let i = 0; i < dataList.length; i++) {
        let dateStr = new Date(dataList[i].completedAt).toLocaleDateString('en', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });

        str += `<li data-slug="${dataList[i].slug}">
        <div class="info-wrap"><span>&#8470;</span><span>${i + 1}</span></div>
        <div class="info-wrap"><span>Name</span><span>${dataList[i].name}</span></div>
        <div class="info-wrap"><span>Language</span><span>${dataList[i].completedLanguages}</span></div>
        <div class="info-wrap"><span>Completed</span><span>${dateStr}</span></div>
        </li>`;
      }

      elemUl.innerHTML = str;
      document.querySelector('.info-list').after(elemUl);
      overlay.classList.add('hidden');

      return elemUl;

    }).then(ul => {

      let elemDiv = null;

      ul.addEventListener('click', (e) => {
        overlay.classList.remove('hidden');

        let li = e.target.closest('li');

        getInfo(url2 + li.dataset.slug).then(data => {
          const div = createEl('div', 'overlay overlay-kata');

          if (elemDiv) elemDiv.remove();
          elemDiv = div;

          elemDiv.innerHTML = `<div class="kata-content">
          <h3>${data.name}</h3>
          <p><span><b>Rank:</b></span> ${data.rank.name}</p>
          <p>${data.description}</p>
          </div>`;

          document.querySelector('.task-wrap').append(div);
          elemDiv.addEventListener('click', () => elemDiv.classList.add('hidden'));
          overlay.classList.add('hidden');
        })
      })
    })
  })


  function createEl(el, cls) {
    let elem = document.createElement(el);
    elem.classList = cls;
    return elem;
  }

  async function getInfo(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
}
