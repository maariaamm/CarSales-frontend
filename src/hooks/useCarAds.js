import { getAllAds, createAd, deleteAd, updateAd } from '../api/carAds.js';


export async function renderAds(containerId, showJustMyAds) {
  const container = document.getElementById(containerId);
  let user = localStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    user = parsedUser;
  }
  if (!container) return;

  try {
    const ads = await getAllAds();

    console.log(user);

    container.innerHTML = ads
      .filter(ad => showJustMyAds && ad.user._id == user.id || !showJustMyAds)
      .map(ad => {
      let buttonsHTML = '';
      if (user && user.id === ad.user._id) {
        buttonsHTML = `
          <button class="edit-btn" data-id="${ad._id}">Edit</button>
          <button class="delete-btn" data-id="${ad._id}">Delete</button>
        `;
      }

      return `
        <div class="car-card">
          <h2>${ad.model} (${ad.year})</h2>
          <p><strong>Brand:</strong> ${ad.brand}</p>
          <p><strong>Price:</strong> ${ad.price} kr</p>
          <p><strong>Description:</strong> ${ad.description}</p>
          <p><strong>fuelType:</strong> ${ad.fuelType}</p>
          <img src="${ad.imageUrl}" alt="${ad.model}">
          <button class="view-btn" data-id="${ad._id}">View Ad</button>
          <input type="hidden" name="adId" value="" />


          ${buttonsHTML}
        </div>
      `;
    }).join('');

    //  event listeners for view button
container.querySelectorAll('.view-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const adId = e.target.dataset.id;
    window.location.href = `/adDetails.html?adId=${adId}`;
  });
});

    //  event listeners for edit
    container.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const adId = e.target.dataset.id;
        window.location.href = `/createAd.html?adId=${adId}`;
      });
    });

    //  event listeners for delete
    container.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async (e) => {
        const adId = e.target.dataset.id;
        if (confirm('Are you sure you want to delete this ad?')) {
          try {
            await deleteAd(adId);
            alert('Ad deleted!');
            renderAds(containerId, showJustMyAds);
          } catch (error) {
            alert('Error deleting ad: ' + error.message);
          }
        }
      });
    });

  } catch (err) {
    container.innerHTML = `<p>Error loading ads: ${err.message}</p>`;
  }
}

export function handleCreateAd(formElement) {
  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    const adId = formElement.adId.value; 

    const adData = {
      brand: formElement.brand.value,
      model: formElement.model.value,
      description: formElement.description.value,
      year: formElement.year.value,
      fuelType: formElement.fuelType.value,
      price: formElement.price.value,
      imageUrl: formElement.imageUrl.value,
    };

    try {
      if (adId) {
        await updateAd(adId, adData); 
        alert('Ad updated!');
      } else {
        await createAd(adData); 
        alert('Ad created!');
      }

      formElement.reset();
      window.location.href = '/';
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving ad: ' + error.message);
    }
  });
}

// navbar if logged in
const authLink = document.getElementById('auth-link');
const token = localStorage.getItem('token');

if (authLink) {
  if (token) {
    authLink.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      <span>Sign out</span>
    `;
    authLink.href = "#";
    authLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/login.html'; 
    });
  } else {
    authLink.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      <span>Sign in / register</span>
    `;
    authLink.href = "/login.html";
  }
}