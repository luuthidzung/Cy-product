<script>
export default {
  name: "ProductCategories",
  props: {
    selectedCategory: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      categories: [],
      isLoading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      this.isLoading = true;
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "http://152.42.240.131/api/v1/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        this.categories = data.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.categories-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 250px;
}

.categories-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.categories-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.menu-icon {
  width: 20px;
  height: 20px;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-button {
  text-align: left;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  background: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.category-button:hover {
  background-color: #f5f5f5;
}

.category-button.active {
  background-color: #e3f2fd;
  color: #1976d2;
  font-weight: 500;
}

@media (max-width: 768px) {
  .categories-container {
    width: 100%;
  }
}
</style>
