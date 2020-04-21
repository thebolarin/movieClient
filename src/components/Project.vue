<template >
  <div>
    <h1 class="logo">Check-DC Movies</h1>

    <div class="section_a">
      <div class="row">
        <div class="col m3 s3 l3 hide-on-down" @click="bringBack()">
          <div class="input-field center">
            <select v-model="tableData.length" @change="getMovies()">
              <option v-for="(records, index) in perPage" :key="index" :value="records">{{records}}</option>
            </select>
          </div>
        </div>
        <div class="col m6 s12 l6 search">
          <form class="search">
            <div class="input-field">
              <input
                id
                name="email"
                type="text"
                v-model="tableData.sea"
                @input="filterSearch"
                autocomplete="off"
                @focus="modal=true"
                placeholder="Search...."
              />
            </div>

            <div
              style="z-index:2;position:relative;cursor:pointer;"
              v-if="filteredSearchs && modal"
              class="autocomplete"
            >
              <ul>
                <li
                  v-for="filteredSearch in filteredSearchs"
                  :key="filteredSearch._id"
                  @click="setSearch(filteredSearch)"
                >{{filteredSearch.title}}</li>
              </ul>
            </div>
          </form>
        </div>

        <div class="col m3 s12 l3 filter">
          <a data-target="my-dropdown" id="dropdown-button" class="dropdown-trigger filterbtn btn">
            Filter
            <i class="flaticon-filter-4"></i>
          </a>
          <div id="my-dropdown" class="dropdown-content">
            <div class="filterSpace">
              <form class="year center">
                <div class="input-field">
                  <input
                    id="year"
                    name="year"
                    type="text"
                    placeholder="Year of release"
                    v-model="filterText"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
      <tbody>
        <tr v-for="movie in filteredMovies" :key="movie._id">
          <td>{{movie._id}}</td>
          <td>{{movie.title}}</td>
          <td>{{movie.year}}</td>
          <td>{{movie.cast.join()}}</td>
          <td>{{movie.genres.join()}}</td>
          <router-link v-bind:to="'/movie/'+movie._id">
            <td>
              <a>
                <i class="flaticon-speech-bubble-1"></i>
              </a>
            </td>
          </router-link>
        </tr>
      </tbody>
    </datatable>
    <pagination :pagination="pagination">
      <div class="cover center">
        <a class="btn" v-if="pagination.prevPage" @click="prevPage()">Prev</a>
        <a class="btn" v-else :disabled="true">Prev</a>

        <a class="btn" v-if="pagination.nextPage" @click="nextPage()">Next</a>
        <a class="btn" v-else :disabled="true">Next</a>
      </div>
    </pagination>
  </div>
</template>
<script>
import axios from "../axios-url";
import Datatable from "./Datatable.vue";
import Pagination from "./Pagination.vue";

export default {
  components: { datatable: Datatable, pagination: Pagination },

  created() {
    this.getMovies();

    const M = window.M;
    M.AutoInit();
  },
  data() {
    let sortOrders = {};

    let columns = ["ID", "Title", "Year", "Cast", "Genres", "Comments"];

    columns.forEach(column => {
      sortOrders[column.year] = -1;
    });

    return {
      movies: [],
      modal: false,
      filteredSearchs: [],
      columns: columns,
      filterText: "",
      sortKey: "Year",
      sortOrders: sortOrders,
      perPage: ["30", "40", "50"],
      tableData: {
        page: 0,
        length: 30,
        sea: "",
        column: 0,
        dir: 1
      },
      pagination: {
        lastPage: "",
        currentPage: "",
        total: "",
        nextPage: "",
        prevPage: "",
        lastPageUrl: "",
        nextPageUrl: "",
        prevPageUrl: "",
        from: "",
        to: ""
      }
    };
  },
  methods: {
    filterSearch() {
      const bring = this.tableData.sea;
      if (bring) {
        this.filteredSearchs = this.movies.filter(element => {
          return element.title.startsWith(this.tableData.sea);
        });
      } else {
        this.bringBack();
      }

      console.log(this.filteredSearch);
    },

    setSearch(search) {
      //  console.log(this.tabledata.sea);
      this.tableData.sea = search.title;
      this.getMovies();

      this.modal = false;
    },
    bringBack() {
      this.modal = false;
      this.getMovies();
    },
    getMovies() {
      console.log(this.tableData);
      axios
        .get("/allData", { params: this.tableData })
        .then(res => {
          const data = res.data.movies;
          const pageData = res.data;
          this.movies = data;
          console.log(this.movies);
          console.log(this.filteredMovies);
          this.configPagination(pageData);
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    nextPage() {
      this.tableData.page++;
      this.getMovies();
    },
    prevPage() {
      this.tableData.page--;
      this.getMovies();
    },
    test() {
      console.log("I am here o");
    },

    configPagination(pageData) {
      this.pagination.lastPage = pageData.lastPage;
      this.pagination.currentPage = pageData.currentPage;
      this.pagination.total = pageData.total;
      this.pagination.nextPage = pageData.nextPage;
      this.pagination.prevPage = pageData.previousPage;
      this.pagination.lastPageUrl = pageData.last_page_url;
      this.pagination.nextPageUrl = pageData.next_page_url;
      this.pagination.prevPageUrl = pageData.prev_page_url;
      this.pagination.from = pageData.from;
      this.pagination.to = pageData.to;
    }
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(element => {
        return element.year.toString().match(this.filterText);
      });
    }
  },
  sortBy(key) {
    this.sortKey = key;
    this.sortOrders[key] = this.sortOrders[key] * -1;
    this.tableData.column = this.getIndex(this.columns, "year", key);
    this.tableData.dir = this.sortOrders[key] === 1 ? "asc" : "desc";
    this.getMovies();
  },
  getIndex(array, key, value) {
    return array.findIndex(i => i[key] == value);
  }
};
</script>