import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "@mui/material";
import { profileDetailsService } from "../services/profile.services";
import { AuthContext } from "../context/auth.context";
import { Navigate, redirect, useNavigate } from "react-router-dom";

function NavbarTrainer() {
  const { authenticaUser} = React.useContext(AuthContext)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [list, setList] = React.useState([]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate()

  React.useEffect(() => {
    getData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    navigate("/");
  }

  const getData = async () => {
    try {
      const response = await profileDetailsService();
      setList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TrainApp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {list.isTrainer === true ? (
                <div>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/clients">Clientes</Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/ejercicios">Ejercicios</Link>
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/planificacion">Planificación</Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/metricas">Métricas</Link>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {list.isTrainer === true ? (
            <div style={{display: "flex", flexDirection: "row"}}>
            <Link href="/clients">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Clientes
              </Button>
            </Link>
            <Link href="/ejercicios">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Ejercicios
              </Button>
            </Link>
            </div>
          ) : (
            <div style={{display: "flex", flexDirection: "row"}}>
            <Link href="/planificacion">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Planificación
              </Button>
            </Link>
            <Link href="/metricas">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Métricas
              </Button>
            </Link>
            </div>
          )}
            
           
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={list.name} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href="/perfil" sx={{ color: "black", display: "block" }}>
                  Perfil
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Link
                  sx={{ color: "black", display: "block" }}
                >
                  LogOut
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarTrainer;
