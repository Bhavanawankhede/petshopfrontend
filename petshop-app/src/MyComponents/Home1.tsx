import * as React from "react";
import { Container } from "react-bootstrap";
import { Box, Paper, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import SimpleImageSlider from "react-simple-image-slider";
import { useEffect, useState } from "react";
import axios from "axios";
import { StoreItemCategory } from "./StoreItemCategory";
import { useNavigate } from "react-router-dom";

const images = [
  {
    url: "https://cdn.shopify.com/s/files/1/1788/4235/articles/PPF-Blog-FelineTransitioning-Blog-Banner_2800x420.jpg?v=1590000174",
  },
  {
    url: "https://th.bing.com/th/id/R.ab2cad50e6088746c12bb6f6759ff6d7?rik=soKlqPReOMWP%2fg&riu=http%3a%2f%2fwww.hdwallpapers.in%2fdownload%2fwestie_dog-1920x1080.jpg&ehk=1mKpcv%2bv9dB7SDSMH9gKlu%2bzWFjmB809UbLNiXAooDA%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    url: "https://th.bing.com/th/id/R.603f427267e6db5c9a2166673adddd93?rik=BAad27YV%2f3MgCg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-rfq7e5EocW4%2fToBydjwh2OI%2fAAAAAAAAABU%2fq7wLqsf1xLw%2fs1600%2fExotic%2bbirds%2bin%2bflight1.png&ehk=D7SlrdULOLDlUs4KGbWYFgpMRugpdOLGccHfhsqvgDU%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    url: "https://th.bing.com/th/id/R.60c3b8d1819b871f536d60e774a3cbeb?rik=Kvd5P6BZI1FmKA&riu=http%3a%2f%2fimagebank.biz%2fwp-content%2fuploads%2f2014%2f10%2f187572.jpg&ehk=en81dZzsFEX9KFZbWPITdnaDzMBBef94rhzAdYYNWuw%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    url: "https://th.bing.com/th/id/OIP.hbaRuOnAkzWU1Jr0E7TagQHaE6?pid=ImgDet&rs=1",
  },
  {
    url: "https://th.bing.com/th/id/OIP.0ym7BjR9J3vk7zBbtrCwlgHaE7?pid=ImgDet&w=1280&h=853&rs=1",
  },
  {
    url: "https://th.bing.com/th/id/OIP.kvYsfUHAAQlEVW3Z3_EEWwHaEK?pid=ImgDet&rs=1",
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [itemCategories, setItemCategories] = useState<any[]>([]);
  const [token] = useState(sessionStorage.getItem("token_ADMIN"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      navigate("/home");
    } else {
      navigate("/admin");
    }
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/itemCategory/getAllItemCategory")
      .then((response) => {
        setItemCategories(response.data);
        console.log(response.data);
      });
  }, []);

  const DisplayData = itemCategories.map((itemCategory) => {
    return (
      <tr>
        <td>
          <StoreItemCategory {...itemCategory} />
        </td>
      </tr>
    );
  });

  return (
    <Box>
      <SimpleImageSlider
        width="100%"
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          <p id="CategoryId"></p>
          Pet Categeories
        </Typography>
        <Container>
          <table className="table">
            <tbody className="ShowPetCategory">{DisplayData}</tbody>
          </table>
        </Container>

        <br />
        <br />

        <Box display={"flex"} sx={{ paddingTop: 5 }}>
          <Card sx={{ maxWidth: 1260 }}>
            <Typography variant="h4">Best Quality Pet Products</Typography>
            <br />
            <Typography color={"#827f85"}>
              Best online pet store for all your pet supplies and pet products.
              Buy pet essentials online at Pawsindia. Shop For Interactive pet
              toys, dog foods, dog toys, cat toys & Much more.Free and Fast
              shipining in All Over India. We care about the well-being of all
              pets, and as a socially conscious company, asiapets.in proudly
              sponsors a donations program to help animals in need. We also
              offer a selection of safe supplements, toys, and supplies.
            </Typography>
          </Card>

          <Card sx={{ maxWidth: 1000 }}>
            <CardMedia
              component="img"
              height="200"
              image="https://th.bing.com/th/id/OIP.v9a_7sdx8fmIq41pL6MRRQHaE8?w=269&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7"
            />
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
