import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Resources = () => {
    const { user } = useAuth();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [openDialog, setOpenDialog] = useState(false);
    const [currentResource, setCurrentResource] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        type: 'room',
        description: '',
        location: '',
        capacity: 0,
        amenities: ''
    });

    useEffect(() => {
        // Mock data fetch
        const fetchResources = async () => {
            try {
                // This would be an API call in a real application
                setTimeout(() => {
                    const mockResources = [
                        {
                            id: 1,
                            name: 'Lecture Hall A',
                            type: 'room',
                            description: 'Large lecture hall with projector and seating for 200 students',
                            location: 'Building 1, Floor 2',
                            capacity: 200,
                            amenities: ['Projector', 'Air Conditioning', 'Microphone System'],
                            image: 'https://source.unsplash.com/random/300x200/?classroom'
                        },
                        {
                            id: 2,
                            name: 'Computer Lab 101',
                            type: 'room',
                            description: 'Computer lab with 30 workstations with latest software',
                            location: 'Building 2, Floor 1',
                            capacity: 30,
                            amenities: ['Computers', 'Whiteboard', 'Printer'],
                            image: 'https://source.unsplash.com/random/300x200/?computer-lab'
                        },
                        {
                            id: 3,
                            name: 'Projector XD-500',
                            type: 'equipment',
                            description: 'High definition projector for presentations',
                            location: 'Equipment Room',
                            amenities: ['Remote', 'HDMI Cable', 'VGA Adapter'],
                            image: 'https://source.unsplash.com/random/300x200/?projector'
                        },
                        {
                            id: 4,
                            name: 'Auditorium',
                            type: 'venue',
                            description: 'Large auditorium for events and conferences',
                            location: 'Main Campus, Building A',
                            capacity: 500,
                            amenities: ['Stage', 'Sound System', 'Lighting'],
                            image: 'https://source.unsplash.com/random/300x200/?auditorium'
                        }
                    ];
                    setResources(mockResources);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching resources:', error);
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    const handleOpenDialog = (resource = null) => {
        if (resource) {
            setCurrentResource(resource);
            setFormData({
                name: resource.name,
                type: resource.type,
                description: resource.description,
                location: resource.location,
                capacity: resource.capacity || 0,
                amenities: resource.amenities.join(', ')
            });
        } else {
            setCurrentResource(null);
            setFormData({
                name: '',
                type: 'room',
                description: '',
                location: '',
                capacity: 0,
                amenities: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        // This would be an API call in a real application
        if (currentResource) {
            // Update existing resource
            const updatedResources = resources.map(res => 
                res.id === currentResource.id 
                    ? { 
                        ...res, 
                        ...formData,
                        amenities: formData.amenities.split(',').map(item => item.trim()) 
                    } 
                    : res
            );
            setResources(updatedResources);
        } else {
            // Add new resource
            const newResource = {
                id: resources.length + 1,
                ...formData,
                amenities: formData.amenities.split(',').map(item => item.trim()),
                image: `https://source.unsplash.com/random/300x200/?${formData.type}`
            };
            setResources([...resources, newResource]);
        }
        handleCloseDialog();
    };

    const handleDelete = (id) => {
        // This would be an API call in a real application
        setResources(resources.filter(resource => resource.id !== id));
    };

    // Filter resources based on search term and type filter
    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             resource.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = filterType === 'all' || resource.type === filterType;
        
        return matchesSearch && matchesFilter;
    });

    return (
        <Box sx={{ py: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Campus Resources</Typography>
                {(user?.isAdmin || user?.isLecturer) && (
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialog()}
                    >
                        Add Resource
                    </Button>
                )}
            </Box>
            
            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            placeholder="Search resources..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <Select
                                value={filterType}
                                onChange={handleFilterChange}
                                displayEmpty
                            >
                                <MenuItem value="all">All Types</MenuItem>
                                <MenuItem value="room">Rooms</MenuItem>
                                <MenuItem value="equipment">Equipment</MenuItem>
                                <MenuItem value="venue">Venues</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
            
            <Grid container spacing={3}>
                {filteredResources.map((resource) => (
                    <Grid item xs={12} sm={6} md={4} key={resource.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={resource.image}
                                alt={resource.name}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    {resource.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {resource.description}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body2">
                                    <strong>Type:</strong> {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Location:</strong> {resource.location}
                                </Typography>
                                {resource.capacity > 0 && (
                                    <Typography variant="body2">
                                        <strong>Capacity:</strong> {resource.capacity}
                                    </Typography>
                                )}
                                {resource.amenities && resource.amenities.length > 0 && (
                                    <Typography variant="body2">
                                        <strong>Amenities:</strong> {resource.amenities.join(', ')}
                                    </Typography>
                                )}
                            </CardContent>
                            {(user?.isAdmin || user?.isLecturer) && (
                                <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <IconButton onClick={() => handleOpenDialog(resource)} size="small">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(resource.id)} size="small" color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </Card>
                    </Grid>
                ))}
                
                {filteredResources.length === 0 && (
                    <Grid item xs={12}>
                        <Paper sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="h6">No resources found</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Try adjusting your search or filter criteria
                            </Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>
            
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {currentResource ? 'Edit Resource' : 'Add New Resource'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    displayEmpty
                                    label="Type"
                                >
                                    <MenuItem value="room">Room</MenuItem>
                                    <MenuItem value="equipment">Equipment</MenuItem>
                                    <MenuItem value="venue">Venue</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Capacity"
                                name="capacity"
                                type="number"
                                value={formData.capacity}
                                onChange={handleInputChange}
                                InputProps={{ inputProps: { min: 0 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Amenities (comma separated)"
                                name="amenities"
                                value={formData.amenities}
                                onChange={handleInputChange}
                                placeholder="e.g. Projector, Whiteboard, WiFi"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {currentResource ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Resources; 