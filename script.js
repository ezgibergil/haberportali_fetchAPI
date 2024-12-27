

const apiKey = '7be8aeafc8de4a85a0bfab1c031e57da'; 
const apiUrl = 'https://newsapi.org/v2/top-headlines'
// Haber kategorileri
const categories = ['sports', 'technology', 'health'];

// Sayfada kategoriyi seçmek için bir olay dinleyicisi
document.querySelector('#categorySelector').addEventListener('change', function(event) {
    const selectedCategory = event.target.value;
    fetchNews(selectedCategory);
});

// Haberleri çekme fonksiyonu
async function fetchNews(category) {
    try { //Hata olmadığında çalışacak satırlar
        const response = await fetch(`${apiUrl}?category=${category}&apiKey=${apiKey}`);
        const data = await response.json();
        
        if (data.status === 'ok') {
            displayNews(data.articles);
        } else {
            console.error('Haberler çekilemedi:', data.message);
        }
    } catch (error) { //hata olduğunda çalışacak kod satırları
        console.error('Hata oluştu:', error);
    }
}

// Çekilen haberleri ekrana yazdırma fonksiyonu
function displayNews(articles) {
    const newsContainer = document.querySelector('#newsContainer');
    newsContainer.innerHTML = ''; // Önceki haberleri temizle

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const title = document.createElement('h3');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description || 'Açıklama bulunmamaktadır.';

        const publishedAt = document.createElement('span');
        publishedAt.textContent = `Yayınlanma Tarihi: ${new Date(article.publishedAt).toLocaleString()}`;

        newsItem.appendChild(title);
        newsItem.appendChild(description);
        newsItem.appendChild(publishedAt);

        newsContainer.appendChild(newsItem);
    });
}

// Sayfa ilk yüklendiğinde spor haberlerini göster
fetchNews('sports');
