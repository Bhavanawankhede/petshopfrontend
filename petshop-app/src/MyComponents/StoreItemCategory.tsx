import '../App.css'
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'



type StoreItemCategoryPros = {
  itemCategoryId: number
  itemCategoryName: string
  itemCategoryImage: string
  itemCategoryDescription: string
}


export function StoreItemCategory({
  itemCategoryId,
  itemCategoryName,
  itemCategoryImage,
  itemCategoryDescription
}: StoreItemCategoryPros) {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslation(['home', 'main']);


  const Style: any = {
    width: 300,
  }

  useEffect(() => {
    const token = localStorage.getItem('userEmail');

    if (token) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }

  })

  const fetchItems = () => {
    localStorage.setItem("itemCategoryName",itemCategoryName); 
    if (isLoggedIn) {
      navigate(`/item/${itemCategoryId}`)
    }
    else {
      navigate('/login')
    }
    return null;
  }
  

  return (
    <Box className="mainContainer1">
      <Card>
        <CardMedia
          component="img"
          image={require('E:/PetShopWebsiteLatest/myfetminiprojectstuffonacer/Images/' +
          itemCategoryImage)}
          style={Style}
        />
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="div">
            <div className="price">{itemCategoryName}</div>
            <Typography variant="body2" color="text.secondary">
              {itemCategoryDescription}
            </Typography>
            <CardActions>
              <Button className='petCategoryShowNow' onClick={fetchItems}>{t("storeItemCategoryButton", { ns: ['main', 'home'] })}
</Button>
              {/* <button className='petCategoryShowNow' onClick={() => fetchItems()}>Shop now</button> */}
            </CardActions>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
