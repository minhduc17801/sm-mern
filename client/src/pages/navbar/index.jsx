import { useEffect, useState, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    Popper,
} from '@mui/material';
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from '../../state/reducer';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween';
import WidgetWrapper from '../../components/WidgetWrapper';
import Friend from '../../components/Friend';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [searchValue, setSearchValue] = useState([]);
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery('(min-width: 768px)');
    const userId = useSelector((state) => state.user._id);

    const searchRef = useRef(null);
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const [debounceInputValue] = useDebounce(inputValue, 500);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    // Hide scroll bar when opening the mobile menu.
    useEffect(() => {
        if (!isNonMobileScreens && isMobileMenuToggled) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [isMobileMenuToggled]);

    useEffect(() => {
        if (!debounceInputValue.trim()) {
            setSearchValue([]);
            return;
        }
        const search = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3001/user/search/${debounceInputValue.trim()}`
                );
                const searchResult = await res.json();
                setSearchValue(searchResult);
            } catch (error) {
                console.log(error);
            }
        };
        search();
    }, [debounceInputValue]);

    useEffect(() => {
        if (searchValue.length > 0) {
            setAnchorEl(searchRef.current);
        } else {
            setAnchorEl(null);
        }
    }, [searchValue]);

    const fullName = `${user.firstName} ${user.lastName}`;
    const open = Boolean(anchorEl);
    const id = open ? 'search-popper' : undefined;
    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt} gap="1.75rem">
            {/* <FlexBetween gap="1.75rem"> */}
            <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color="primary"
                onClick={() => navigate('/home')}
                sx={{
                    '&:hover': {
                        color: primaryLight,
                        cursor: 'pointer',
                    },
                }}
            >
                SM
            </Typography>
            {/* {isNonMobileScreens && ( */}
            <FlexBetween
                aria-describedby={id}
                ref={searchRef}
                backgroundColor={neutralLight}
                borderRadius="9px"
                gap="3rem"
                padding="0.1rem 1.5rem"
            >
                <InputBase
                    placeholder="Search..."
                    value={inputValue}
                    onChange={handleChange}
                />
                <IconButton>
                    <Search />
                </IconButton>
            </FlexBetween>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 8],
                            },
                        },
                    ],
                }}
            >
                <WidgetWrapper
                    // width={anchorEl && anchorEl.offsetWidth}
                    width="auto"
                    display="flex"
                    flexDirection="column"
                    gap="1.5rem"
                    bgcl={background}
                >
                    {searchValue.map((friend, index) => (
                        <Friend
                            key={index}
                            userId={userId}
                            friendId={friend._id}
                            lastName={friend.lastName}
                            firstName={friend.firstName}
                            desc={friend.email}
                            picturePath={friend.picturePath}
                        />
                    ))}
                </WidgetWrapper>
            </Popper>
            {/*  )} */}
            {/* </FlexBetween> */}

            {/* DESKTOP NAV */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkMode sx={{ fontSize: '25px' }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: '25px' }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: '25px' }} />
                    <Notifications sx={{ fontSize: '25px' }} />
                    <Help sx={{ fontSize: '25px' }} />
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: '150px',
                                borderRadius: '0.25rem',
                                p: '0.25rem 1rem',
                                '& .MuiSvgIcon-root': {
                                    pr: '0.25rem',
                                    width: '3rem',
                                },
                                '& .MuiSelect-select:focus': {
                                    backgroundColor: neutralLight,
                                },
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    navigate('/');
                                    dispatch(setLogout());
                                }}
                            >
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu />
                </IconButton>
            )}

            {/* MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    left="0"
                    top="0"
                    bgcolor="rgba(0, 0, 0, 0.3)"
                    zIndex="5"
                    overflow="hidden"
                >
                    <Box
                        position="absolute"
                        right="0"
                        height="100%"
                        top="0"
                        zIndex="10"
                        maxWidth="500px"
                        minWidth="300px"
                        backgroundColor={alt}
                    >
                        {/* CLOSE ICON */}
                        <Box display="flex" justifyContent="flex-end" p="1rem">
                            <IconButton
                                onClick={() =>
                                    setIsMobileMenuToggled(!isMobileMenuToggled)
                                }
                            >
                                <Close />
                            </IconButton>
                        </Box>

                        {/* MENU ITEMS */}
                        <FlexBetween
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            gap="3rem"
                        >
                            <IconButton
                                onClick={() => dispatch(setMode())}
                                sx={{ fontSize: '25px' }}
                            >
                                {theme.palette.mode === 'dark' ? (
                                    <DarkMode sx={{ fontSize: '25px' }} />
                                ) : (
                                    <LightMode
                                        sx={{ color: dark, fontSize: '25px' }}
                                    />
                                )}
                            </IconButton>
                            <Message sx={{ fontSize: '25px' }} />
                            <Notifications sx={{ fontSize: '25px' }} />
                            <Help sx={{ fontSize: '25px' }} />
                            <FormControl variant="standard" value={fullName}>
                                <Select
                                    value={fullName}
                                    sx={{
                                        backgroundColor: neutralLight,
                                        width: '150px',
                                        borderRadius: '0.25rem',
                                        p: '0.25rem 1rem',
                                        '& .MuiSvgIcon-root': {
                                            pr: '0.25rem',
                                            width: '3rem',
                                        },
                                        '& .MuiSelect-select:focus': {
                                            backgroundColor: neutralLight,
                                        },
                                    }}
                                    input={<InputBase />}
                                >
                                    <MenuItem value={fullName}>
                                        <Typography>{fullName}</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            navigate('/');
                                            dispatch(setLogout());
                                        }}
                                    >
                                        Log Out
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </FlexBetween>
                    </Box>
                </Box>
            )}
        </FlexBetween>
    );
};

export default Navbar;
