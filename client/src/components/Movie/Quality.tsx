import styled from '@emotion/styled';
import { ToggleButton, Box, ToggleButtonGroup } from '@mui/material';
import { useEffect } from 'react';
import { Torrent } from '../../types';

const QualityButton = styled(ToggleButton)({
	color: '#001489',
	backgroundColor: '#ffffff5e',
	'&.Mui-selected, &.Mui-selected:hover': {
		color: 'white',
		backgroundColor: '#001489'
	}
});

const QualityContainer = styled(Box)`
	display: flex;
	justify-content: flex-end;
`;

const Quality = ({
	torrents,
	quality: qualityObj
}: {
	torrents: Torrent[];
	quality: {
		setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
		value: string | undefined;
		onChange: (_event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => void;
	};
}) => {
	const { setValue: setQuality, ...quality } = qualityObj;

	useEffect(() => {
		setQuality(torrents[0].quality || undefined);
	}, [setQuality, torrents]);

	return (
		<QualityContainer>
			<ToggleButtonGroup exclusive {...quality}>
				{torrents.map((torrent, index) => {
					if (
						torrent.quality === '720p' ||
						torrent.quality === '1080p' ||
						torrent.quality === '3D'
					) {
						return (
							<QualityButton key={index} value={torrent.quality} size="small">
								{torrent.quality}
							</QualityButton>
						);
					}
					return undefined;
				})}
			</ToggleButtonGroup>
		</QualityContainer>
	);
};

export default Quality;
