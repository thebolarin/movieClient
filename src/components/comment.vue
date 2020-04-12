<template>
  <div>
    <h1 class="logo">Check-DC Movie Detail</h1>
    <div class="section_d center">
      <div class="container">
        <h3>Overview</h3>
        <div class="details center">
          <div class="row top">
            <div class="col m6 l6 s12 left">
              <p class="heading">Title</p>
              <p class="content">{{movies.title}}</p>
            </div>
            <div class="col m6 l6 s12 right">
              <p class="heading">Year of Release</p>
              <p class="content">{{movies.year}}</p>
            </div>
          </div>
          <div class="row bottom">
            <div class="col m6 l6 s12 left">
              <p class="heading">Casts</p>
              <p class="content">{{movies.cast.join()}}</p>
            </div>
            <div class="col m6 l6 s12 right">
              <p class="heading">Genres</p>
              <p class="content">{{movies.genres.join()}}</p>
            </div>
          </div>
        </div>

        <h3>Comment</h3>
        <div class="comment center">
          <br />
          <div v-for="comment in comments" :key="comment._id" class="comments">
            <p class="user">
              <img src="/img/pro.png" alt="profileImg" srcset /> Anonymous
            </p>
            <p class="resp">{{comment.content}}</p>
            <p class="time">{{moment(comment.createdAt).format('YYYY-MM-DD')}}</p>
          </div>

          <br />
          <div class="textarea">
            <br />
            <form class="response center" @submit.prevent="createComment" a novalidate>
              <div class="input-field">
                <input name="comment" v-model="content" type="text" placeholder="Add Comment" />
              </div>
              <div>
                <input type="submit" :disabled="disabled" value="Submit" class="commentbtn btn" />
              </div>
              <!-- <a class=" commentbtn btn " >Comment</a> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "../axios-url";
import openSocket from "socket.io-client";

export default {
  props: ["movieId"],
  data: function() {
    return {
      content: "",
      movies: {},
      comments: []
    };
  },
  created() {
    this.viewComments(this.$route.params.movieId);
    this.getComments(this.$route.params.movieId);
    const M = window.M;
    M.AutoInit();
  },
  methods: {
    createComment() {
      this.loading = true;
      console.log("hitted");
      const formData = {
        content: this.content,
        movieId: this.movies._id
      };
      console.log(formData);
      axios
        .post("/create", formData)
        .then(res => {
          this.loading = false;
          this.comments = this.getComments(this.$route.params.movieId);
          console.log(res);
        })
        .catch(error => {
          error;
        });
    },
    getComments(movieId) {
      axios
        .get("/comment/" + movieId)
        .then(res => {
          const data = res.data.comments;
          this.comments = data;
          console.log(data);
        })
        .catch(err => {
          err;
        });
      const socket = openSocket("http://localhost:3000");
      socket.on("new-message", data => {
        this.content.push(data.content);
      });
    },
    viewComments(movieId) {
      axios
        .get("/fetch/" + movieId)
        .then(res => {
          const data = res.data.movie;
          this.movies = data;
          this.comments = res.data.movie.comments;
          console.log(data);
        })
        .catch(err => {
          err;
        });
    }
  }
};
</script>